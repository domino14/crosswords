package cwgame

import (
	"testing"

	"github.com/domino14/liwords/pkg/cwgame/runemapping"
	"github.com/matryer/is"
)

func TestLeave(t *testing.T) {
	// Test blank exchange works
	is := is.New(t)
	l, err := Leave([]runemapping.MachineLetter{0, 3, 5, 6},
		[]runemapping.MachineLetter{0})

	is.NoErr(err)
	is.Equal(l, []runemapping.MachineLetter{3, 5, 6})
}
