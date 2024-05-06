package common

import (
	"context"
	"errors"
	"fmt"
	"os"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/woogles-io/liwords/pkg/entity"

	"github.com/rs/zerolog/log"
)

var TestDBHost = os.Getenv("TEST_DB_HOST")
var MigrationsPath = os.Getenv("DB_MIGRATIONS_PATH")
var TestDBPrefix = os.Getenv("TEST_DB_PREFIX")
var TestDBPort = os.Getenv("DB_PORT")
var TestDBUser = os.Getenv("DB_USER")
var TestDBPassword = os.Getenv("DB_PASSWORD")
var TestDBSSLMode = os.Getenv("DB_SSL_MODE")

func TestDBName(pkg string) string {
	return TestDBPrefix + "_" + pkg
}

func RecreateTestDB(pkg string) error {
	ctx := context.Background()
	db, err := pgx.Connect(ctx, PostgresConnUri(TestDBHost, TestDBPort,
		"", TestDBUser, TestDBPassword, TestDBSSLMode))
	if err != nil {
		return err
	}
	defer db.Close(ctx)
	log.Info().Msg("dropping db")
	_, err = db.Exec(ctx, fmt.Sprintf("DROP DATABASE IF EXISTS %s", TestDBName(pkg)))
	if err != nil {
		return err
	}
	log.Info().Msg("creating db")
	_, err = db.Exec(ctx, fmt.Sprintf("CREATE DATABASE %s", TestDBName(pkg)))
	if err != nil {
		return err
	}
	log.Info().Msg("running migrations")
	// And create all tables/sequences/etc.
	m, err := migrate.New(MigrationsPath, TestingPostgresConnUri(pkg))
	if err != nil {
		return err
	}
	if err := m.Up(); err != nil {
		return err
	}
	e1, e2 := m.Close()
	log.Err(e1).Msg("close-source")
	log.Err(e2).Msg("close-database")
	log.Info().Msg("created test db")
	return nil
}

func TeardownTestDB(pkg string) error {
	ctx := context.Background()
	db, err := pgx.Connect(ctx, PostgresConnUri(TestDBHost, TestDBPort,
		"", TestDBUser, TestDBPassword, TestDBSSLMode))
	if err != nil {
		return err
	}
	defer db.Close(ctx)

	_, err = db.Exec(ctx, fmt.Sprintf("DROP DATABASE IF EXISTS %s", TestDBName(pkg)))
	if err != nil {
		return err
	}
	return nil
}

func OpenTestingDB(pkg string) (*pgxpool.Pool, error) {
	return OpenDB(TestDBHost, TestDBPort, TestDBName(pkg), TestDBUser, TestDBPassword, TestDBSSLMode)
}

func TestingPostgresConnUri(pkg string) string {
	return PostgresConnUri(TestDBHost, TestDBPort, TestDBName(pkg), TestDBUser, TestDBPassword, TestDBSSLMode)
}

// XXX: Delete me after removing Gorm
func TestingPostgresConnDSN(pkg string) string {
	return PostgresConnDSN(TestDBHost, TestDBPort, TestDBName(pkg), TestDBUser, TestDBPassword, TestDBSSLMode)
}

func UpdateWithPool(ctx context.Context, pool *pgxpool.Pool, columns []string, args []interface{}, cfg *CommonDBConfig) error {
	tx, err := pool.BeginTx(ctx, DefaultTxOptions)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx)

	err = Update(ctx, tx, columns, args, cfg)
	if err != nil {
		return err
	}

	if err := tx.Commit(ctx); err != nil {
		return err
	}

	return nil
}

func GetUserRatingWithPool(ctx context.Context, pool *pgxpool.Pool, userId int64, ratingKey entity.VariantKey) (*entity.SingleRating, error) {
	tx, err := pool.BeginTx(ctx, DefaultTxOptions)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(ctx)

	rating, err := GetUserRating(ctx, tx, userId, ratingKey)
	if err != nil {
		return nil, err
	}

	if err := tx.Commit(ctx); err != nil {
		return nil, err
	}

	return rating, nil
}

func GetUserStatsWithPool(ctx context.Context, pool *pgxpool.Pool, userId int64, ratingKey entity.VariantKey) (*entity.Stats, error) {
	tx, err := pool.BeginTx(ctx, DefaultTxOptions)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(ctx)

	stats, err := GetUserStats(ctx, tx, userId, ratingKey)
	if err != nil {
		return nil, err
	}

	if err := tx.Commit(ctx); err != nil {
		return nil, err
	}

	return stats, nil
}

func GetDBIDFromUUID(ctx context.Context, pool *pgxpool.Pool, cfg *CommonDBConfig) (int64, error) {
	tx, err := pool.BeginTx(ctx, DefaultTxOptions)
	if err != nil {
		return 0, err
	}
	defer tx.Rollback(ctx)

	var id int64
	if cfg.TableType == UsersTable {
		id, err = GetUserDBIDFromUUID(ctx, tx, cfg.Value.(string))
	} else if cfg.TableType == GamesTable {
		id, err = GetGameDBIDFromUUID(ctx, tx, cfg.Value.(string))
	} else if cfg.TableType == PuzzlesTable {
		id, err = GetPuzzleDBIDFromUUID(ctx, tx, cfg.Value.(string))
	} else {
		return 0, errors.New("unknown table")
	}
	if err != nil {
		return 0, err
	}

	if err := tx.Commit(ctx); err != nil {
		return 0, err
	}
	return id, nil
}
