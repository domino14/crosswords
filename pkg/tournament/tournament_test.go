package tournament_test

import (
	"context"
	"fmt"
	"os"
	"sort"
	"testing"

	"github.com/jinzhu/gorm"
	"github.com/matryer/is"
	"github.com/rs/zerolog/log"

	"github.com/domino14/liwords/pkg/config"
	"github.com/domino14/liwords/pkg/entity"
	"github.com/domino14/liwords/pkg/gameplay"
	"github.com/domino14/liwords/pkg/stores/game"
	ts "github.com/domino14/liwords/pkg/stores/tournament"
	"github.com/domino14/liwords/pkg/stores/user"
	"github.com/domino14/liwords/pkg/tournament"
	pkguser "github.com/domino14/liwords/pkg/user"
	realtime "github.com/domino14/liwords/rpc/api/proto/realtime"
	pb "github.com/domino14/liwords/rpc/api/proto/tournament_service"
	macondoconfig "github.com/domino14/macondo/config"
	macondopb "github.com/domino14/macondo/gen/api/proto/macondo"
)

var TestDBHost = os.Getenv("TEST_DB_HOST")
var TestingDBConnStr = "host=" + TestDBHost + " port=5432 user=postgres password=pass sslmode=disable"
var gameReq = &realtime.GameRequest{Lexicon: "CSW19",
	Rules: &realtime.GameRules{BoardLayoutName: entity.CrosswordGame,
		LetterDistributionName: "English",
		VariantName:            "classic"},

	InitialTimeSeconds: 25 * 60,
	IncrementSeconds:   0,
	ChallengeRule:      macondopb.ChallengeRule_FIVE_POINT,
	GameMode:           realtime.GameMode_REAL_TIME,
	RatingMode:         realtime.RatingMode_RATED,
	RequestId:          "yeet",
	OriginalRequestId:  "originalyeet",
	MaxOvertimeMinutes: 10}

var DefaultConfig = macondoconfig.Config{
	LexiconPath:               os.Getenv("LEXICON_PATH"),
	LetterDistributionPath:    os.Getenv("LETTER_DISTRIBUTION_PATH"),
	DefaultLexicon:            "CSW19",
	DefaultLetterDistribution: "English",
}

var divOneName = "Division 1"
var divTwoName = "Division 2"

func recreateDB() {
	// Create a database.
	db, err := gorm.Open("postgres", TestingDBConnStr+" dbname=postgres")
	if err != nil {
		log.Fatal().Err(err).Msg("error")
	}
	defer db.Close()
	db = db.Exec("DROP DATABASE IF EXISTS liwords_test")
	if db.Error != nil {
		log.Fatal().Err(db.Error).Msg("error")
	}
	db = db.Exec("CREATE DATABASE liwords_test")
	if db.Error != nil {
		log.Fatal().Err(db.Error).Msg("error")
	}

	ustore := userStore(TestingDBConnStr + " dbname=liwords_test")

	for _, u := range []*entity.User{
		{Username: "Will", Email: "cesar@woogles.io", UUID: "Will"},
		{Username: "Josh", Email: "mina@gmail.com", UUID: "Josh"},
		{Username: "Conrad", Email: "crad@woogles.io", UUID: "Conrad"},
		{Username: "Jesse", Email: "jesse@woogles.io", UUID: "Jesse"},
		{Username: "Kieran", Email: "kieran@woogles.io", UUID: "Kieran"},
		{Username: "Vince", Email: "vince@woogles.io", UUID: "Vince"},
		{Username: "Jennifer", Email: "jenn@woogles.io", UUID: "Jennifer"},
		{Username: "Guy", Email: "guy@woogles.io", UUID: "Guy"},
		{Username: "Evans", Email: "evans@woogles.io", UUID: "Evans"},
		{Username: "Bob", Email: "bob@woogles.io", UUID: "Bob"},
		{Username: "Noah", Email: "noah@woogles.io", UUID: "Noah"},
		{Username: "Zoof", Email: "zoof@woogles.io", UUID: "Zoof"},
		{Username: "Harry", Email: "harry@woogles.io", UUID: "Harry"},
		{Username: "Oof", Email: "oof@woogles.io", UUID: "Oof"},
		{Username: "Dude", Email: "dude@woogles.io", UUID: "Dude"},
		{Username: "Comrade", Email: "comrade@woogles.io", UUID: "Comrade"},
		{Username: "ValuedCustomer", Email: "valued@woogles.io", UUID: "ValuedCustomer"},
	} {
		err = ustore.New(context.Background(), u)
		if err != nil {
			log.Fatal().Err(err).Msg("error")
		}
	}
	ustore.(*user.DBStore).Disconnect()
}

func tournamentStore(dbURL string, gs gameplay.GameStore) (*config.Config, tournament.TournamentStore) {
	cfg := &config.Config{}
	cfg.MacondoConfig = DefaultConfig
	cfg.DBConnString = dbURL

	tmp, err := ts.NewDBStore(cfg, gs)
	if err != nil {
		log.Fatal().Err(err).Msg("error")
	}
	tournamentStore := ts.NewCache(tmp)
	return cfg, tournamentStore
}

func makeRoundControls() []*realtime.RoundControl {
	return []*realtime.RoundControl{&realtime.RoundControl{FirstMethod: realtime.FirstMethod_AUTOMATIC_FIRST,
		PairingMethod:               realtime.PairingMethod_ROUND_ROBIN,
		GamesPerRound:               1,
		Factor:                      1,
		MaxRepeats:                  1,
		AllowOverMaxRepeats:         true,
		RepeatRelativeWeight:        1,
		WinDifferenceRelativeWeight: 1},
		&realtime.RoundControl{FirstMethod: realtime.FirstMethod_AUTOMATIC_FIRST,
			PairingMethod:               realtime.PairingMethod_ROUND_ROBIN,
			GamesPerRound:               1,
			Factor:                      1,
			MaxRepeats:                  1,
			AllowOverMaxRepeats:         true,
			RepeatRelativeWeight:        1,
			WinDifferenceRelativeWeight: 1},
		&realtime.RoundControl{FirstMethod: realtime.FirstMethod_AUTOMATIC_FIRST,
			PairingMethod:               realtime.PairingMethod_ROUND_ROBIN,
			GamesPerRound:               1,
			Factor:                      1,
			MaxRepeats:                  1,
			AllowOverMaxRepeats:         true,
			RepeatRelativeWeight:        1,
			WinDifferenceRelativeWeight: 1},
		&realtime.RoundControl{FirstMethod: realtime.FirstMethod_AUTOMATIC_FIRST,
			PairingMethod:               realtime.PairingMethod_KING_OF_THE_HILL,
			GamesPerRound:               1,
			Factor:                      1,
			MaxRepeats:                  1,
			AllowOverMaxRepeats:         true,
			RepeatRelativeWeight:        1,
			WinDifferenceRelativeWeight: 1}}
}

func makeControls() *realtime.TournamentControls {
	return &realtime.TournamentControls{
		GameRequest:   gameReq,
		RoundControls: makeRoundControls(),
		Type:          int32(entity.ClassicTournamentType),
		AutoStart:     true}
}

func makeTournament(ctx context.Context, ts tournament.TournamentStore, cfg *config.Config, directors *realtime.TournamentPersons) (*entity.Tournament, error) {
	return tournament.NewTournament(ctx,
		ts,
		"Tournament",
		"This is a test Tournament",
		directors,
		entity.TypeStandard,
		"",
		"/tournament/slug-tourney",
	)
}

func userStore(dbURL string) pkguser.Store {
	ustore, err := user.NewDBStore(TestingDBConnStr + " dbname=liwords_test")
	if err != nil {
		log.Fatal().Err(err).Msg("error")
	}
	return ustore
}

func gameStore(dbURL string, userStore pkguser.Store) (*config.Config, gameplay.GameStore) {
	cfg := &config.Config{}
	cfg.MacondoConfig = DefaultConfig
	cfg.DBConnString = dbURL

	tmp, err := game.NewDBStore(cfg, userStore)
	if err != nil {
		log.Fatal().Err(err).Msg("error")
	}
	gameStore := game.NewCache(tmp)
	return cfg, gameStore
}

func TestTournamentSingleDivision(t *testing.T) {
	is := is.New(t)
	ctx := context.Background()
	cstr := TestingDBConnStr + " dbname=liwords_test"
	recreateDB()
	us := userStore(cstr)
	_, gs := gameStore(cstr, us)
	cfg, tstore := tournamentStore(cstr, gs)

	players := &realtime.TournamentPersons{Persons: map[string]int32{"Will": 1000, "Josh": 3000, "Conrad": 2200, "Jesse": 2100}}
	directors := &realtime.TournamentPersons{Persons: map[string]int32{"Kieran:Kieran": 0, "Vince:Vince": 2, "Jennifer:Jennifer": 2}}
	directorsTwoExecutives := &realtime.TournamentPersons{Persons: map[string]int32{"Kieran:Kieran": 0, "Vince:Vince": 0, "Jennifer:Jennifer": 2}}
	directorsNoExecutives := &realtime.TournamentPersons{Persons: map[string]int32{"Kieran:Kieran": 1, "Vince:Vince": 3, "Jennifer:Jennifer": 2}}

	ty, err := makeTournament(ctx, tstore, cfg, directorsTwoExecutives)
	is.True(err != nil)

	ty, err = makeTournament(ctx, tstore, cfg, directorsNoExecutives)
	is.True(err != nil)

	ty, err = makeTournament(ctx, tstore, cfg, directors)
	is.NoErr(err)

	err = tournament.SetTournamentMetadata(ctx, tstore, ty.UUID, "New Name", "New Description", "/tournament/foo", entity.TypeStandard)
	is.NoErr(err)

	// Check that directors are set correctly
	is.NoErr(equalTournamentPersons(directors, ty.Directors))

	// Attempt to remove a division that doesn't exist in the empty tournament
	err = tournament.RemoveDivision(ctx, tstore, ty.UUID, "The Big Boys")
	is.True(err != nil)

	// Add a division
	err = tournament.AddDivision(ctx, tstore, ty.UUID, divOneName)
	is.NoErr(err)

	// Attempt to remove a division that doesn't exist when other
	// divisions are present
	err = tournament.RemoveDivision(ctx, tstore, ty.UUID, "Nope")
	is.True(err != nil)

	// Attempt to add a division that already exists
	err = tournament.AddDivision(ctx, tstore, ty.UUID, divOneName)
	is.True(err != nil)

	// Attempt to add directors that already exist
	err = tournament.AddDirectors(ctx, tstore, us, ty.UUID, &realtime.TournamentPersons{Persons: map[string]int32{"Guy": 1, "Vince": 2}})
	is.True(err != nil)
	is.NoErr(equalTournamentPersons(directors, ty.Directors))

	// Attempt to add another executive director
	err = tournament.AddDirectors(ctx, tstore, us, ty.UUID, &realtime.TournamentPersons{Persons: map[string]int32{"Guy": 1, "Harry": 0}})
	is.True(err != nil)
	is.NoErr(equalTournamentPersons(directors, ty.Directors))

	// Add directors
	err = tournament.AddDirectors(ctx, tstore, us, ty.UUID, &realtime.TournamentPersons{Persons: map[string]int32{"Evans": 4, "Oof": 2}})
	is.NoErr(err)
	is.NoErr(equalTournamentPersons(&realtime.TournamentPersons{Persons: map[string]int32{"Kieran:Kieran": 0, "Vince:Vince": 2, "Jennifer:Jennifer": 2, "Evans:Evans": 4, "Oof:Oof": 2}}, ty.Directors))

	// Attempt to remove directors that don't exist
	err = tournament.RemoveDirectors(ctx, tstore, us, ty.UUID, &realtime.TournamentPersons{Persons: map[string]int32{"Evans": -1, "Zoof": 2}})
	is.True(err.Error() == "person (Zoof, 0) does not exist")
	is.NoErr(equalTournamentPersons(&realtime.TournamentPersons{Persons: map[string]int32{"Kieran:Kieran": 0, "Vince:Vince": 2, "Jennifer:Jennifer": 2, "Evans:Evans": 4, "Oof:Oof": 2}}, ty.Directors))

	// Attempt to remove the executive director
	err = tournament.RemoveDirectors(ctx, tstore, us, ty.UUID, &realtime.TournamentPersons{Persons: map[string]int32{"Evans": -1, "Kieran": 0}})
	is.True(err.Error() == "cannot remove the executive director")
	is.NoErr(equalTournamentPersons(&realtime.TournamentPersons{Persons: map[string]int32{"Kieran:Kieran": 0, "Vince:Vince": 2, "Jennifer:Jennifer": 2, "Evans:Evans": 4, "Oof:Oof": 2}}, ty.Directors))

	// Remove directors
	err = tournament.RemoveDirectors(ctx, tstore, us, ty.UUID, &realtime.TournamentPersons{Persons: map[string]int32{"Evans": -1, "Oof": 2}})
	is.NoErr(err)
	is.NoErr(equalTournamentPersons(&realtime.TournamentPersons{Persons: map[string]int32{"Kieran:Kieran": 0, "Vince:Vince": 2, "Jennifer:Jennifer": 2}}, ty.Directors))

	// Attempt to remove the executive director
	err = tournament.RemoveDirectors(ctx, tstore, us, ty.UUID, &realtime.TournamentPersons{Persons: map[string]int32{"Vince": -1, "Kieran": 0}})
	is.True(err.Error() == "cannot remove the executive director")
	is.NoErr(equalTournamentPersons(&realtime.TournamentPersons{Persons: map[string]int32{"Kieran:Kieran": 0, "Vince:Vince": 2, "Jennifer:Jennifer": 2}}, ty.Directors))

	// Same thing for players.
	div1 := ty.Divisions[divOneName]

	// Add players
	err = tournament.AddPlayers(ctx, tstore, us, ty.UUID, divOneName, players)
	is.NoErr(err)
	is.NoErr(equalTournamentPersons(&realtime.TournamentPersons{Persons: map[string]int32{"Will:Will": 1000, "Josh:Josh": 3000, "Conrad:Conrad": 2200, "Jesse:Jesse": 2100}}, div1.Players))

	// Add players to a division that doesn't exist
	err = tournament.AddPlayers(ctx, tstore, us, ty.UUID, divOneName+"not quite", &realtime.TournamentPersons{Persons: map[string]int32{"Noah": 4, "Bob": 2}})
	is.True(err.Error() == "division Division 1not quite does not exist")
	is.NoErr(equalTournamentPersons(&realtime.TournamentPersons{Persons: map[string]int32{"Will:Will": 1000, "Josh:Josh": 3000, "Conrad:Conrad": 2200, "Jesse:Jesse": 2100}}, div1.Players))

	// Add players
	err = tournament.AddPlayers(ctx, tstore, us, ty.UUID, divOneName, &realtime.TournamentPersons{Persons: map[string]int32{"Noah": 4, "Bob": 2}})
	is.NoErr(err)
	is.NoErr(equalTournamentPersons(&realtime.TournamentPersons{Persons: map[string]int32{"Will:Will": 1000, "Josh:Josh": 3000, "Conrad:Conrad": 2200, "Jesse:Jesse": 2100, "Noah:Noah": 4, "Bob:Bob": 2}}, div1.Players))

	// Remove players that don't exist
	err = tournament.RemovePlayers(ctx, tstore, us, ty.UUID, divOneName, &realtime.TournamentPersons{Persons: map[string]int32{"Evans": -1}})
	is.True(err.Error() == "person (Evans, 0) does not exist")
	is.NoErr(equalTournamentPersons(&realtime.TournamentPersons{Persons: map[string]int32{"Will:Will": 1000, "Josh:Josh": 3000, "Conrad:Conrad": 2200, "Jesse:Jesse": 2100, "Noah:Noah": 4, "Bob:Bob": 2}}, div1.Players))

	// Remove players from a division that doesn't exist
	err = tournament.RemovePlayers(ctx, tstore, us, ty.UUID, divOneName+"hmm", &realtime.TournamentPersons{Persons: map[string]int32{"Josh": -1, "Conrad": 2}})
	is.True(err.Error() == "division Division 1hmm does not exist")
	is.NoErr(equalTournamentPersons(&realtime.TournamentPersons{Persons: map[string]int32{"Will:Will": 1000, "Josh:Josh": 3000, "Conrad:Conrad": 2200, "Jesse:Jesse": 2100, "Noah:Noah": 4, "Bob:Bob": 2}}, div1.Players))

	// Remove players
	err = tournament.RemovePlayers(ctx, tstore, us, ty.UUID, divOneName, &realtime.TournamentPersons{Persons: map[string]int32{"Josh": -1, "Conrad": 2}})
	is.NoErr(err)
	is.NoErr(equalTournamentPersons(&realtime.TournamentPersons{Persons: map[string]int32{"Will:Will": 1000, "Jesse:Jesse": 2100, "Noah:Noah": 4, "Bob:Bob": 2}}, div1.Players))

	// Set tournament controls
	err = tournament.SetTournamentControls(ctx,
		tstore,
		ty.UUID,
		divOneName,
		makeControls())
	is.NoErr(err)

	// Set tournament controls for a division that does not exist
	err = tournament.SetTournamentControls(ctx,
		tstore,
		ty.UUID,
		divOneName+" another one",
		makeControls())
	is.True(err.Error() == "division Division 1 another one does not exist")

	// Tournament should not be started
	isStarted, err := tournament.IsStarted(ctx, tstore, ty.UUID)
	is.NoErr(err)
	is.True(!isStarted)

	// Set pairing should work before the tournament starts
	pairings := []*pb.TournamentPairingRequest{&pb.TournamentPairingRequest{PlayerOneId: "Will:Will", PlayerTwoId: "Jesse:Jesse", Round: 0, IsForfeit: false}}
	err = tournament.SetPairings(ctx, tstore, ty.UUID, divOneName, pairings)
	is.NoErr(err)

	// Remove players and attempt to set pairings
	err = tournament.RemovePlayers(ctx, tstore, us, ty.UUID, divOneName, &realtime.TournamentPersons{Persons: map[string]int32{"Will": 1000, "Jesse": 2100, "Noah": 4, "Bob": 2}})
	is.NoErr(err)
	is.NoErr(equalTournamentPersons(&realtime.TournamentPersons{Persons: map[string]int32{}}, div1.Players))

	err = tournament.SetPairings(ctx, tstore, ty.UUID, divOneName, pairings)
	is.True(err.Error() == "player does not exist in the division: Will:Will")

	err = tournament.SetResult(ctx,
		tstore,
		us,
		ty.UUID,
		divOneName,
		"Will:Will",
		"Jesse:Jesse",
		500,
		400,
		realtime.TournamentGameResult_WIN,
		realtime.TournamentGameResult_LOSS,
		realtime.GameEndReason_STANDARD,
		0,
		0,
		false,
		nil,
	)
	is.True(err.Error() == "cannot set tournament results before the tournament has started")

	isRoundComplete, err := tournament.IsRoundComplete(ctx, tstore, ty.UUID, divOneName, 0)
	is.True(err.Error() == "cannot check if round is complete before the tournament has started")

	isFinished, err := tournament.IsFinished(ctx, tstore, ty.UUID, divOneName)
	is.True(err.Error() == "cannot check if tournament is finished before the tournament has started")

	// Add players back in
	err = tournament.AddPlayers(ctx, tstore, us, ty.UUID, divOneName, players)
	is.NoErr(err)
	is.NoErr(equalTournamentPersons(&realtime.TournamentPersons{Persons: map[string]int32{"Will:Will": 1000, "Josh:Josh": 3000, "Conrad:Conrad": 2200, "Jesse:Jesse": 2100}}, div1.Players))

	// Start the tournament

	err = tournament.StartTournament(ctx, tstore, ty.UUID, true)
	is.NoErr(err)

	// Attempt to add a division after the tournament has started
	err = tournament.AddDivision(ctx, tstore, ty.UUID, divOneName+" this time it's different")
	is.True(err.Error() == "cannot add division after the tournament has started")

	// Attempt to remove a division after the tournament has started
	err = tournament.RemoveDivision(ctx, tstore, ty.UUID, divOneName)
	is.True(err.Error() == "cannot remove division after the tournament has started")

	// Trying setting the controls after the tournament has started, this should fail
	err = tournament.SetTournamentControls(ctx,
		tstore,
		ty.UUID,
		divOneName,
		makeControls())
	is.True(err.Error() == "cannot change tournament controls after it has started")

	// Tournament pairings and results are tested in the
	// entity package
	err = tournament.SetPairings(ctx, tstore, ty.UUID, divOneName, pairings)
	is.NoErr(err)

	// Set pairings for division that does not exist
	err = tournament.SetPairings(ctx, tstore, ty.UUID, divOneName+"yeet", pairings)
	is.True(err.Error() == "division Division 1yeet does not exist")

	err = tournament.SetResult(ctx,
		tstore,
		us,
		ty.UUID,
		divOneName,
		"Will",
		"Jesse",
		500,
		400,
		realtime.TournamentGameResult_WIN,
		realtime.TournamentGameResult_LOSS,
		realtime.GameEndReason_STANDARD,
		0,
		0,
		false,
		nil)
	is.NoErr(err)

	// Set results for a division that does not exist
	err = tournament.SetResult(ctx,
		tstore,
		us,
		ty.UUID,
		divOneName+"big boi",
		"Will",
		"Jesse",
		500,
		400,
		realtime.TournamentGameResult_WIN,
		realtime.TournamentGameResult_LOSS,
		realtime.GameEndReason_STANDARD,
		0,
		0,
		false,
		nil)
	is.True(err.Error() == "division Division 1big boi does not exist")

	isStarted, err = tournament.IsStarted(ctx, tstore, ty.UUID)
	is.NoErr(err)
	is.True(isStarted)

	isRoundComplete, err = tournament.IsRoundComplete(ctx, tstore, ty.UUID, divOneName, 0)
	is.NoErr(err)
	is.True(!isRoundComplete)

	// See if round is complete for division that does not exist
	isRoundComplete, err = tournament.IsRoundComplete(ctx, tstore, ty.UUID, divOneName+"yah", 0)
	is.True(err.Error() == "division Division 1yah does not exist")

	isFinished, err = tournament.IsFinished(ctx, tstore, ty.UUID, divOneName)
	is.NoErr(err)
	is.True(!isFinished)

	// See if division is finished (except it doesn't exist)
	isFinished, err = tournament.IsFinished(ctx, tstore, ty.UUID, divOneName+"but wait there's more")
	is.True(err.Error() == "division Division 1but wait there's more does not exist")

	us.(*user.DBStore).Disconnect()
	tstore.(*ts.Cache).Disconnect()
	gs.(*game.Cache).Disconnect()
}

func TestTournamentMultipleDivisions(t *testing.T) {
	is := is.New(t)
	ctx := context.Background()
	cstr := TestingDBConnStr + " dbname=liwords_test"

	recreateDB()
	us := userStore(cstr)
	_, gs := gameStore(cstr, us)
	cfg, tstore := tournamentStore(cstr, gs)

	divOnePlayers := &realtime.TournamentPersons{Persons: map[string]int32{"Will": 1000, "Josh": 3000, "Conrad": 2200, "Jesse": 2100}}
	divTwoPlayers := &realtime.TournamentPersons{Persons: map[string]int32{"Guy": 1000, "Dude": 3000, "Comrade": 2200, "ValuedCustomer": 2100}}
	directors := &realtime.TournamentPersons{Persons: map[string]int32{"Kieran": 0, "Vince": 2, "Jennifer": 2}}

	divOnePlayersCompare := &realtime.TournamentPersons{Persons: map[string]int32{"Will:Will": 1000, "Josh:Josh": 3000, "Conrad:Conrad": 2200, "Jesse:Jesse": 2100}}
	divTwoPlayersCompare := &realtime.TournamentPersons{Persons: map[string]int32{"Guy:Guy": 1000, "Dude:Dude": 3000, "Comrade:Comrade": 2200, "ValuedCustomer:ValuedCustomer": 2100}}
	//directorsCompare := &realtime.TournamentPersons{Persons: map[string]int32{"Kieran:Kieran": 0, "Vince:Vince": 2, "Jennifer:Jennifer": 2}}

	ty, err := makeTournament(ctx, tstore, cfg, directors)
	is.NoErr(err)

	// Add divisions
	err = tournament.AddDivision(ctx, tstore, ty.UUID, divOneName)
	is.NoErr(err)

	err = tournament.AddDivision(ctx, tstore, ty.UUID, divTwoName)
	is.NoErr(err)

	// Set tournament controls
	err = tournament.SetTournamentControls(ctx,
		tstore,
		ty.UUID,
		divOneName,
		makeControls())
	is.NoErr(err)

	err = tournament.SetTournamentControls(ctx,
		tstore,
		ty.UUID,
		divTwoName,
		makeControls())
	is.NoErr(err)

	div1 := ty.Divisions[divOneName]
	div2 := ty.Divisions[divTwoName]

	// Add players
	err = tournament.AddPlayers(ctx, tstore, us, ty.UUID, divOneName, divOnePlayers)
	is.NoErr(err)
	is.NoErr(equalTournamentPersons(divOnePlayersCompare, div1.Players))

	err = tournament.AddPlayers(ctx, tstore, us, ty.UUID, divTwoName, divTwoPlayers)
	is.NoErr(err)
	is.NoErr(equalTournamentPersons(divTwoPlayersCompare, div2.Players))

	pairings := []*pb.TournamentPairingRequest{&pb.TournamentPairingRequest{PlayerOneId: "Will:Will", PlayerTwoId: "Jesse:Jesse", Round: 0, IsForfeit: false}}
	err = tournament.SetPairings(ctx, tstore, ty.UUID, divOneName, pairings)
	is.NoErr(err)

	pairings = []*pb.TournamentPairingRequest{&pb.TournamentPairingRequest{PlayerOneId: "Guy:Guy", PlayerTwoId: "Comrade:Comrade", Round: 0, IsForfeit: false}}
	err = tournament.SetPairings(ctx, tstore, ty.UUID, divTwoName, pairings)
	is.NoErr(err)

	pairings = []*pb.TournamentPairingRequest{&pb.TournamentPairingRequest{PlayerOneId: "Conrad:Conrad", PlayerTwoId: "Josh:Josh", Round: 0, IsForfeit: false}}
	err = tournament.SetPairings(ctx, tstore, ty.UUID, divOneName, pairings)
	is.NoErr(err)

	pairings = []*pb.TournamentPairingRequest{&pb.TournamentPairingRequest{PlayerOneId: "Dude:Dude", PlayerTwoId: "ValuedCustomer:ValuedCustomer", Round: 0, IsForfeit: false}}
	err = tournament.SetPairings(ctx, tstore, ty.UUID, divTwoName, pairings)
	is.NoErr(err)

	// Start the tournament

	err = tournament.StartTournament(ctx, tstore, ty.UUID, true)
	is.NoErr(err)

	err = tournament.SetResult(ctx,
		tstore,
		us,
		ty.UUID,
		divOneName,
		"Will",
		"Jesse",
		500,
		400,
		realtime.TournamentGameResult_WIN,
		realtime.TournamentGameResult_LOSS,
		realtime.GameEndReason_STANDARD,
		0,
		0,
		false,
		nil)
	is.NoErr(err)

	err = tournament.SetResult(ctx,
		tstore,
		us,
		ty.UUID,
		divTwoName,
		"Comrade",
		"Guy",
		500,
		400,
		realtime.TournamentGameResult_WIN,
		realtime.TournamentGameResult_LOSS,
		realtime.GameEndReason_STANDARD,
		0,
		0,
		false,
		nil)
	is.NoErr(err)

	err = tournament.SetResult(ctx,
		tstore,
		us,
		ty.UUID,
		divOneName,
		"Conrad",
		"Josh",
		500,
		400,
		realtime.TournamentGameResult_WIN,
		realtime.TournamentGameResult_LOSS,
		realtime.GameEndReason_STANDARD,
		0,
		0,
		false,
		nil)
	is.NoErr(err)

	err = tournament.SetResult(ctx,
		tstore,
		us,
		ty.UUID,
		divTwoName,
		"ValuedCustomer",
		"Dude",
		500,
		400,
		realtime.TournamentGameResult_WIN,
		realtime.TournamentGameResult_LOSS,
		realtime.GameEndReason_STANDARD,
		0,
		0,
		false,
		nil)
	is.NoErr(err)

	divOneComplete, err := tournament.IsRoundComplete(ctx, tstore, ty.UUID, divOneName, 0)
	is.NoErr(err)
	is.True(divOneComplete)

	divTwoComplete, err := tournament.IsRoundComplete(ctx, tstore, ty.UUID, divTwoName, 0)
	is.NoErr(err)
	is.True(divTwoComplete)

	us.(*user.DBStore).Disconnect()
	tstore.(*ts.Cache).Disconnect()
	gs.(*game.Cache).Disconnect()
}

func equalTournamentPersons(tp1 *realtime.TournamentPersons, tp2 *realtime.TournamentPersons) error {
	tp1String := tournamentPersonsToString(tp1)
	tp2String := tournamentPersonsToString(tp2)
	for k, v1 := range tp1.Persons {
		v2, ok := tp2.Persons[k]
		if !ok || v1 != v2 {
			return fmt.Errorf("tournamentPersons structs are not equal: %s, %s", tp1String, tp2String)
		}
	}
	for k, v2 := range tp2.Persons {
		v1, ok := tp1.Persons[k]
		if !ok || v1 != v2 {
			return fmt.Errorf("tournamentPersons structs are not equal: %s, %s", tp1String, tp2String)
		}
	}

	return nil
}

func tournamentPersonsToString(tp *realtime.TournamentPersons) string {
	s := "{"
	keys := []string{}
	for k, _ := range tp.Persons {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	for i := 0; i < len(keys); i++ {
		s += fmt.Sprintf("%s: %d", keys[i], tp.Persons[keys[i]])
		if i != len(keys)-1 {
			s += ", "
		}
	}
	return s + "}"
}
