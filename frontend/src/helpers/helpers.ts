export const match_fields: string[] = [
  "team",
  "games_played",
  "win",
  "draw",
  "loss",
  "goals_for",
  "goals_against",
  "points",
  "year",
  "actions",
];

export const getTitle = (line: string) => {
  switch (line) {
    case "team":
      return "Team";
    case "games_played":
      return "Games Played";
    case "win":
      return "Win";
    case "draw":
      return "Draw";
    case "loss":
      return "Loss";
    case "goals_for":
      return "Goals For";
    case "goals_against":
      return "Goals Against";
    case "points":
      return "Points";
    case "year":
      return "Points";
    case "actions":
      return "Actions";
  }
  return "";
};

export interface MatchData {
  [key: string]: any;
}
