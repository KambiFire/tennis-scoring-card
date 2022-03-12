import react, { useState } from "react";
import "./styles.css";

import * as Cmp from "./components";

export default function App() {
  const initialBestOf = 3;
  const initialPlayers = { player1: "", player2: "" };
  const initialScores = { player1: 0, player2: 0 };

  const [isGameOn, setIsGameOn] = useState(false);
  const [bestOf, setBestOf] = useState(0);
  const [scorer, setScorer] = useState(0);
  const [players, setPlayers] = useState(initialPlayers);
  const [gamesScore, setGamesScore] = useState(initialScores);
  const [setsScore, setSetsScore] = useState(initialScores);
  const [matchScore, setMatchScore] = useState<Types.Scoring[]>([]);

  const [scores, dispatch] = useState([initialScores]);

  const reducer = (action: number) => {
    let pointsPlayer1 = scores[0].player1,
      pointsPlayer2 = scores[0].player2;

    let gamesPlayer1 = gamesScore.player1,
      gamesPlayer2 = gamesScore.player2;

    let setsPlayer1 = setsScore.player1,
      setsPlayer2 = setsScore.player2;

    if (action === 1) {
      if (pointsPlayer1 === 3 && pointsPlayer2 === 4) pointsPlayer2 -= 1;
      else if (pointsPlayer1 === 3 && pointsPlayer2 < 3) {
        pointsPlayer1 = 5;
        gamesPlayer1 += 1;
        setGamesScore({ ...gamesScore, player1: gamesPlayer1 });
      } else pointsPlayer1 += 1;
    }

    if (action === 2) {
      if (pointsPlayer2 === 3 && pointsPlayer1 === 4) pointsPlayer1 -= 1;
      else if (pointsPlayer2 === 3 && pointsPlayer1 < 3) {
        pointsPlayer2 = 5;
        gamesPlayer2 += 1;
        setGamesScore({ ...gamesScore, player2: gamesPlayer2 });
      } else pointsPlayer2 += 1;
    }

    if (pointsPlayer1 === 5 || pointsPlayer2 === 5) {
      if ((gamesPlayer1 === 6 && gamesPlayer2 < 5) || gamesPlayer1 === 7) {
        setsPlayer1 += 1;
        setSetsScore({ ...setsScore, player1: setsPlayer1 });
        setMatchScore([
          ...matchScore,
          { player1: gamesPlayer1, player2: gamesPlayer2 },
        ]);
        setGamesScore(initialScores);
      }
      if ((gamesPlayer2 === 6 && gamesPlayer1 < 5) || gamesPlayer2 === 7) {
        setsPlayer2 += 1;
        setSetsScore({ ...setsScore, player2: setsPlayer2 });
        setMatchScore([
          ...matchScore,
          { player1: gamesPlayer1, player2: gamesPlayer2 },
        ]);
        setGamesScore(initialScores);
      }

      if (setsPlayer1 + setsPlayer2 === bestOf) setIsGameOn(false);
      else setTimeout(() => dispatch([initialScores]), 1500);
    }

    dispatch([{ player1: pointsPlayer1, player2: pointsPlayer2 }, ...scores]);
  };

  const resetMatch = () => {
    dispatch([initialScores]);
    setGamesScore(initialScores);
    setSetsScore(initialScores);
    setPlayers(initialPlayers);
    setMatchScore([]);
    setBestOf(0);
    setIsGameOn(false);
  };

  const updateScores = (score: number) => {
    reducer(score);
    if (score !== 3) {
      setScorer(score);
      setTimeout(() => setScorer(0), 1500);
    } else resetMatch();
  };

  const setMatch = (players: Types.Players, bestOf: number) => {
    resetMatch();
    setIsGameOn(true);
    setPlayers(players);
    setGamesScore(initialScores);
    if (bestOf) setBestOf(bestOf);
    else setBestOf(initialBestOf);
  };

  return (
    <div className="App">
      <h1>Tennis Scoring</h1>
      <div className="ScoreContainer">
        <div className="ScoresCard">
          <h3 style={{ margin: 10 }}>Game Card</h3>
          <Cmp.GameHeader players={players} setsScore={setsScore} />
          <Cmp.CurrentGameScore
            scores={scores}
            scorer={scorer}
            gamesScore={gamesScore}
          />
          <Cmp.CurrentGamePlay scores={scores} />
        </div>

        <div className="ScoresCard">
          <h3 style={{ margin: 10 }}>{`Match Card ${
            bestOf ? `( Best of ${bestOf} )` : ""
          }`}</h3>

          {!isGameOn &&
            matchScore.length > 0 &&
            matchScore.length === bestOf && (
              <Cmp.GameOver
                player={
                  setsScore.player1 > setsScore.player2
                    ? players.player1 ?? "Player 1"
                    : players.player2 ?? "Player 2"
                }
              />
            )}

          <Cmp.MatchScore
            players={players}
            matchScore={matchScore}
            bestOf={bestOf}
          />
        </div>
      </div>

      <div className="ButtonContainer">
        <Cmp.CurrentGameScoring
          isHidden={!isGameOn}
          players={players}
          updateScores={updateScores}
        />
      </div>

      <div className="ButtonContainer">
        <Cmp.GameSetup isHidden={isGameOn} setMatch={setMatch} />
      </div>
    </div>
  );
}
