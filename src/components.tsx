import { useState } from "react";

import { scoreIndex } from "./constants";

// Game Over Component
export const GameOver = ({ player }: { player: string }) => (
  <div className="GameOverCard">
    <h2 style={{ margin: 5 }}>Game Over</h2>
    <h3 style={{ margin: 5 }}>{player} Wins!!</h3>
  </div>
);

// Match Scores
export const MatchScore = ({
  players,
  matchScore,
  bestOf
}: Types.MatchScores) => {
  let sets: string[] = [];

  for (let i = 1; i <= bestOf; i++) sets = [...sets, `Set ${i}`];

  return (
    <div
      className="ContentCard"
      style={{ justifyContent: "center", borderTop: "1px solid green" }}
    >
      <table style={{ width: "90%", marginTop: 5 }}>
        <colgroup>
          <col width="auto" />
          <col width="30%%" />
          <col width="30%%" />
        </colgroup>
        <thead>
          <tr style={{ backgroundColor: "white" }}>
            <th></th>
            <th>
              <h4 style={{ margin: 5 }}>
                {players.player1 ? players.player1 : "Player 1"}
              </h4>
            </th>
            <th>
              <h4 style={{ margin: 5 }}>
                {players.player2 ? players.player2 : "Player 2"}
              </h4>
            </th>
          </tr>
        </thead>
        <tbody>
          {sets.map((set, index) => (
            <tr key={index}>
              <td>
                <h4 style={{ margin: 5 }}>{set}</h4>
              </td>
              <td>
                <h4
                  style={{
                    margin: 5,
                    borderRadius: 4,
                    backgroundColor:
                      matchScore[index]?.player1 > matchScore[index]?.player2
                        ? "limegreen"
                        : ""
                  }}
                >
                  {matchScore[index]?.player1 ?? "-"}
                </h4>
              </td>
              <td>
                <h4
                  style={{
                    margin: 5,
                    borderRadius: 4,
                    backgroundColor:
                      matchScore[index]?.player2 > matchScore[index]?.player1
                        ? "limegreen"
                        : ""
                  }}
                >
                  {matchScore[index]?.player2 ?? "-"}
                </h4>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Current Game Header
export const GameHeader = ({ players, setsScore }: Types.HeaderScores) => (
  <div
    className="ContentCard"
    style={{ borderTop: "1px solid green", alignItems: "center" }}
  >
    <h3 style={{ width: "45%", margin: 5 }}>
      {players.player1 ? players.player1 : "Player 1"}
    </h3>
    <h3 style={{ width: "45%", margin: 5 }}>
      Sets
      <br />( {setsScore.player1} - {setsScore.player2} )
    </h3>
    <h3 style={{ width: "45%", margin: 5 }}>
      {players.player2 ? players.player2 : "Player 2"}
    </h3>
  </div>
);

// Current Game Score
export const CurrentGameScore = ({
  scores,
  scorer,
  gamesScore
}: Types.GameScore) => {
  let p1Score = scoreIndex[scores[0].player1];
  let p2Score = scoreIndex[scores[0].player2];
  if (scores[0].player1 === 3 && scores[0].player2 === 3) {
    p1Score = "Deuce";
    p2Score = "Deuce";
  }

  let scorer1 = "",
    scorer2 = "";
  if (scorer === 1) scorer1 = "green";
  else if (scorer === 2) scorer2 = "green";

  return (
    <div className="ContentCard" style={{ margin: 5 }}>
      <div
        style={{
          border: "1px solid",
          width: "30%",
          backgroundColor: scorer1,
          borderRadius: "7px"
        }}
      >
        <h2>{p1Score}</h2>
      </div>
      <div style={{ width: "20%", border: "1px solid", borderRadius: "7px" }}>
        <b>
          <br />
          Games
        </b>
        <h3
          style={{ margin: 5 }}
        >{`${gamesScore.player1} - ${gamesScore.player2}`}</h3>
      </div>
      <div
        style={{
          border: "1px solid",
          width: "30%",
          backgroundColor: scorer2,
          borderRadius: "7px"
        }}
      >
        <h2>{p2Score}</h2>
      </div>
    </div>
  );
};

// Current Game Play
export const CurrentGamePlay = ({ scores }: { scores: Types.Scoring[] }) => {
  const getScore = (score: number, opponent: number) => {
    if (score === 3 && opponent === 3) return "Deuce";
    else return scoreIndex[score];
  };

  return (
    <div className="ContentCard" style={{ justifyContent: "center" }}>
      <table style={{ width: "90%" }}>
        <tbody>
          {scores &&
            scores.length > 0 &&
            scores.map(
              (score, index) =>
                index !== 0 && (
                  <tr key={index}>
                    <td>
                      <h4 style={{ margin: 0 }}>
                        {getScore(score.player1, score.player2)}
                      </h4>
                    </td>
                    <td>
                      <h4 style={{ margin: 0 }}> - </h4>
                    </td>
                    <td>
                      <h4 style={{ margin: 0 }}>
                        {getScore(score.player2, score.player1)}
                      </h4>
                    </td>
                  </tr>
                )
            )}
        </tbody>
      </table>
    </div>
  );
};

// Current Game Scoring
export const CurrentGameScoring = ({
  updateScores,
  players,
  isHidden
}: Types.UpdateScores) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const clickHandler = (player: number) => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 1500);

    if (player === 1) updateScores(1);
    else if (player === 2) updateScores(2);
    else if (player === 3) updateScores(3);
  };

  return (
    <div className="ContentCard" style={{ display: isHidden ? "none" : "" }}>
      <div style={{ width: "30%", padding: "10px 0" }}>
        <button
          style={{ width: "80%" }}
          name="player1"
          onClick={() => clickHandler(1)}
          disabled={isDisabled}
        >
          <h2>{players.player1 ? players.player1 : "Player 1"}: Wins</h2>
        </button>
      </div>
      <div style={{ width: "30%", padding: "10px 0" }}>
        <button
          style={{ width: "80%" }}
          name="player2"
          onClick={() => clickHandler(2)}
          disabled={isDisabled}
        >
          <h2>{players.player2 ? players.player2 : "Player 2"}: Wins</h2>
        </button>
      </div>
      <div style={{ width: "25%", padding: "10px 0" }}>
        <button
          style={{ width: "80%", backgroundColor: "goldenrod" }}
          name="player2"
          onClick={() => clickHandler(3)}
          disabled={isDisabled}
        >
          <h3>Reset Game</h3>
        </button>
      </div>
    </div>
  );
};

// Game Setup
export const GameSetup = ({ setMatch, isHidden }: Types.SetMatch) => {
  const initialPlayers = { player1: "", player2: "" };
  const [isDisabled, setIsDisabled] = useState(false);
  const [players, setplayers] = useState(initialPlayers);
  const [bestOf, setBestOf] = useState(3);

  const clickHandler = () => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 500);

    if (players.player1 && players.player2) {
      setMatch(players, bestOf);
      setplayers(initialPlayers);
    } else alert("Please enter players' names");
  };

  return (
    <div className="ContentCard" style={{ display: isHidden ? "none" : "" }}>
      <div style={{ width: "25%" }}>
        <h3 style={{ margin: 10 }}>Enter Player 1</h3>
        <input
          style={{ width: "80%", height: 30, borderRadius: 7 }}
          value={players.player1}
          onChange={(e) => {
            if (e.target.value.length === 1)
              setplayers({ ...players, player1: e.target.value.toUpperCase() });
            else setplayers({ ...players, player1: e.target.value });
          }}
        />
      </div>

      <div style={{ width: "25%" }}>
        <h3 style={{ margin: 10 }}>Enter Player 2</h3>
        <input
          style={{ width: "80%", height: 30, borderRadius: 7 }}
          value={players.player2}
          onChange={(e) => {
            if (e.target.value.length === 1)
              setplayers({ ...players, player2: e.target.value.toUpperCase() });
            else setplayers({ ...players, player2: e.target.value });
          }}
        />
      </div>

      <div style={{ width: "20%" }}>
        <h3 style={{ margin: 10 }}>Select Best Of</h3>
        <select
          style={{
            width: "50%",
            height: 35,
            borderRadius: 7,
            textAlign: "center"
          }}
          value={bestOf}
          onChange={(e) => setBestOf(parseInt(e.target.value, 10))}
        >
          <option>3</option>
          <option>5</option>
          <option>7</option>
        </select>
      </div>

      <div style={{ width: "25%", padding: "20px 0" }}>
        <button
          style={{ width: "80%", backgroundColor: "goldenrod" }}
          name="player2"
          onClick={clickHandler}
          disabled={isDisabled}
        >
          <h2>Setup Match</h2>
        </button>
      </div>
    </div>
  );
};
