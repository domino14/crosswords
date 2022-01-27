package soughtgame

import (
	"context"
	"encoding/json"
	"errors"
	"time"

	"gorm.io/datatypes"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/domino14/liwords/pkg/config"
	"github.com/domino14/liwords/pkg/entity"
	"github.com/rs/zerolog/log"

	pb "github.com/domino14/liwords/rpc/api/proto/ipc"
)

type DBStore struct {
	cfg *config.Config
	db  *gorm.DB
}

type soughtgame struct {
	CreatedAt time.Time
	UUID      string `gorm:"index"`
	Seeker    string `gorm:"index"`

	Type         string // seek, match
	SeekerConnID string `gorm:"index"`
	// Only for match requests
	Receiver            string `gorm:"index"`
	ReceiverConnID      string `gorm:"index"`
	ReceiverIsPermanent bool

	Request datatypes.JSON
}

func NewDBStore(config *config.Config) (*DBStore, error) {
	db, err := gorm.Open(postgres.Open(config.DBConnString), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	db.AutoMigrate(&soughtgame{})
	return &DBStore{db: db, cfg: config}, nil
}

func (s *DBStore) sgFromDBObj(g *soughtgame) (*entity.SoughtGame, error) {
	sr := &pb.SeekRequest{}
	err := json.Unmarshal(g.Request, sr)
	if err != nil {
		return nil, err
	}
	return &entity.SoughtGame{SeekRequest: sr}, nil
}

// Get gets the sought game with the given ID.
func (s *DBStore) Get(ctx context.Context, id string) (*entity.SoughtGame, error) {
	g := &soughtgame{}
	ctxDB := s.db.WithContext(ctx)
	if result := ctxDB.Where("uuid = ?", id).First(g); result.Error != nil {
		return nil, result.Error
	}
	return s.sgFromDBObj(g)
}

// GetBySeekerConnID gets the sought game with the given socket connection ID for the seeker.
func (s *DBStore) GetBySeekerConnID(ctx context.Context, connID string) (*entity.SoughtGame, error) {
	g := &soughtgame{}
	ctxDB := s.db.WithContext(ctx)
	if result := ctxDB.Where("seeker_conn_id = ?", connID).First(g); result.Error != nil {
		return nil, result.Error
	}
	return s.sgFromDBObj(g)
}

// GetByReceiverConnID gets the sought game with the given socket connection ID for the receiver.
func (s *DBStore) GetByReceiverConnID(ctx context.Context, connID string) (*entity.SoughtGame, error) {
	g := &soughtgame{}
	ctxDB := s.db.WithContext(ctx)
	if result := ctxDB.Where("receiver_conn_id = ?", connID).First(g); result.Error != nil {
		return nil, result.Error
	}
	return s.sgFromDBObj(g)
}

func (s *DBStore) getBySeekerID(ctx context.Context, seekerID string) (*entity.SoughtGame, error) {
	g := &soughtgame{}
	ctxDB := s.db.WithContext(ctx)
	if result := ctxDB.Where("seeker = ?", seekerID).First(g); result.Error != nil {
		return nil, result.Error
	}
	return s.sgFromDBObj(g)
}

func (s *DBStore) getByReceiverID(ctx context.Context, receiverID string) (*entity.SoughtGame, error) {
	g := &soughtgame{}
	ctxDB := s.db.WithContext(ctx)
	if result := ctxDB.Where("receiver = ?", receiverID).First(g); result.Error != nil {
		return nil, result.Error
	}
	return s.sgFromDBObj(g)
}

// Set sets the sought-game in the database.
func (s *DBStore) Set(ctx context.Context, game *entity.SoughtGame) error {
	var bts []byte
	var sgtype string
	var err error
	bts, err = json.Marshal(game.SeekRequest)

	if err != nil {
		return err
	}
	// For open seek requests, receiverConnID
	// might return errors. This is okay, when setting
	// sought games, we just want to set whatever is available
	// and avoid conditional checks for open/closed seeks.
	id, _ := game.ID()
	seekerConnID, _ := game.SeekerConnID()
	seeker, _ := game.SeekerUserID()
	receiver, _ := game.ReceiverUserID()
	receiverConnID, _ := game.ReceiverConnID()

	dbg := &soughtgame{
		UUID:           id,
		SeekerConnID:   seekerConnID,
		Seeker:         seeker,
		Receiver:       receiver,
		ReceiverConnID: receiverConnID,
		Type:           sgtype,
		Request:        bts,
	}
	ctxDB := s.db.WithContext(ctx)
	result := ctxDB.Create(dbg)
	return result.Error
}

func (s *DBStore) deleteSoughtGame(ctx context.Context, id string) error {
	ctxDB := s.db.WithContext(ctx)
	result := ctxDB.Where("uuid = ?", id).Delete(&soughtgame{})
	return result.Error
}

func (s *DBStore) Delete(ctx context.Context, id string) error {
	return s.deleteSoughtGame(ctx, id)
}

// ExpireOld expires old seek requests. Usually this shouldn't be necessary
// unless something weird happens.
func (s *DBStore) ExpireOld(ctx context.Context) error {
	ctxDB := s.db.WithContext(ctx)

	// Don't expire tournament match requests; handle this elsewhere.
	result := ctxDB.Where("created_at < now() - interval '1 hour' and type in ('match', 'seek')").Delete(&soughtgame{})
	if result.Error == nil && result.RowsAffected > 0 {
		log.Info().Int("rows-affected", int(result.RowsAffected)).Msg("expire-old-seeks")
	}
	return result.Error
}

// DeleteForUser deletes the game by seeker ID
func (s *DBStore) DeleteForUser(ctx context.Context, userID string) (*entity.SoughtGame, error) {
	sg, err := s.getBySeekerID(ctx, userID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}

	id, err := sg.ID()
	if err != nil {
		return nil, err
	}

	return sg, s.deleteSoughtGame(ctx, id)
}

// UpdateForReceiver updates the receiver's status when the receiver leaves
func (s *DBStore) UpdateForReceiver(ctx context.Context, receiverID string) (*entity.SoughtGame, error) {
	rg, err := s.getByReceiverID(ctx, receiverID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}

	receiverIsPermanent, err := rg.ReceiverIsPermanent()
	if err != nil {
		return nil, err
	}

	rg.SeekRequest.ReceiverState = pb.SeekState_ABSENT
	if !receiverIsPermanent {
		rg.SeekRequest.ReceivingUser = nil
	}
	return rg, s.Set(ctx, rg)
}

// DeleteForSeekerConnID deletes the game by connection ID
func (s *DBStore) DeleteForSeekerConnID(ctx context.Context, connID string) (*entity.SoughtGame, error) {
	sg, err := s.GetBySeekerConnID(ctx, connID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	id, err := sg.ID()
	if err != nil {
		return nil, err
	}

	return sg, s.deleteSoughtGame(ctx, id)
}

// DeleteForConnID modifies the game by connection ID
func (s *DBStore) UpdateForReceiverConnID(ctx context.Context, connID string) (*entity.SoughtGame, error) {
	rg, err := s.GetByReceiverConnID(ctx, connID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}

	receiverIsPermanent, err := rg.ReceiverIsPermanent()
	if err != nil {
		return nil, err
	}

	rg.SeekRequest.ReceiverState = pb.SeekState_ABSENT
	if !receiverIsPermanent {
		rg.SeekRequest.ReceivingUser = nil
	}
	return rg, s.Set(ctx, rg)
}

// ListOpenSeeks lists all open seek requests for receiverID, in tourneyID (optional)
func (s *DBStore) ListOpenSeeks(ctx context.Context, receiverID, tourneyID string) ([]*entity.SoughtGame, error) {
	var games []soughtgame
	var err error
	ctxDB := s.db.WithContext(ctx)
	query := ctxDB.Table("soughtgames")

	if tourneyID != "" {
		query = query.Where("receiver = ? AND request->>'tournament_id' = ?", receiverID, tourneyID)
	} else {
		query = query.Where("receiver = ? OR receiver = ''", receiverID)
	}
	if result := query.Scan(&games); result.Error != nil {
		return nil, result.Error
	}

	entGames := make([]*entity.SoughtGame, len(games))
	for idx, g := range games {
		entGames[idx], err = s.sgFromDBObj(&g)
		if err != nil {
			return nil, err
		}
	}
	return entGames, nil
}

// ExistsForUser returns true if the user already has an outstanding seek request.
func (s *DBStore) ExistsForUser(ctx context.Context, userID string) (bool, error) {
	ctxDB := s.db.WithContext(ctx)
	var count int64
	if result := ctxDB.Model(&soughtgame{}).Where("seeker = ?", userID).Count(&count); result.Error != nil {
		return false, result.Error
	}
	return count > 0, nil
}

// UserMatchedBy returns true if there is an open seek request from matcher for user
func (s *DBStore) UserMatchedBy(ctx context.Context, userID, matcher string) (bool, error) {

	ctxDB := s.db.WithContext(ctx)
	var count int64

	if result := ctxDB.Model(&soughtgame{}).
		Where("receiver = ? AND seeker = ?", userID, matcher).
		Count(&count); result.Error != nil {
		return false, result.Error
	}

	return count > 0, nil
}
