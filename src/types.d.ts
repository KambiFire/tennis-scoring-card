declare namespace Types {
  interface Players {
    player1: string;
    player2: string;
  }

  interface Scoring {
    player1: number;
    player2: number;
  }

  interface HeaderScores {
    setsScore: Scoring;
    players: Players;
  }

  interface GameScore {
    scores: Scoring[];
    scorer: number;
    gamesScore: Scoring;
  }

  interface UpdateScores {
    updateScores: (score: number) => void;
    players: Players;
    isHidden: boolean;
  }

  interface SetMatch {
    setMatch: (p: Players, b: number) => void;
    isHidden: boolean;
  }

  interface MatchScores {
    matchScore: Scoring[];
    players: Players;
    bestOf: number;
  }
}
