package tournament_test

import (
	"context"
	"encoding/json"
	"flag"
	"os"
	"testing"

	"github.com/domino14/liwords/pkg/common/testutils"
	"github.com/domino14/liwords/pkg/entity"
	"github.com/domino14/liwords/pkg/tournament"
	"github.com/matryer/is"
)

var goldenFileUpdate bool

func init() {
	flag.BoolVar(&goldenFileUpdate, "update", false, "update golden files")
}

func TestExport(t *testing.T) {
	is := is.New(t)
	ctx := context.Background()
	dbc, cfg := recreateDB()
	defer func() { dbc.cleanup() }()
	tstore, us := dbc.ts, dbc.us

	testcases := []struct {
		name         string
		divisionfile string
		goldenfile   string
		format       string
	}{
		{"wtf5-csv", "wtf5.json", "wtf5-standings.golden", "standingsonly"},
		{"wtf5-tsh", "wtf5.json", "wtf5-tsh.golden", "tsh"},
	}
	directors := makeTournamentPersons(map[string]int32{"Kieran:Kieran": 0, "Vince:Vince": 2, "Jennifer:Jennifer": 2})

	ty, err := makeTournament(ctx, tstore, cfg, directors)
	is.NoErr(err)

	for _, tc := range testcases {
		cts, err := os.ReadFile("./testdata/" + tc.divisionfile)
		is.NoErr(err)
		var divisions map[string]*entity.TournamentDivision
		err = json.Unmarshal([]byte(cts), &divisions)
		is.NoErr(err)
		for _, division := range divisions {
			if division.ManagerType == entity.ClassicTournamentType {
				var classicDivision tournament.ClassicDivision
				err = json.Unmarshal(division.DivisionRawMessage, &classicDivision)
				is.NoErr(err)
				division.DivisionManager = &classicDivision
				division.DivisionRawMessage = nil
			}
		}
		ty.Divisions = divisions
		ret, err := tournament.ExportTournament(ctx, ty, us, tc.format)
		is.NoErr(err)
		testutils.CompareGolden(t, "./testdata/"+tc.goldenfile, []byte(ret), goldenFileUpdate)
	}
}
