import { UserFeedback } from "./UserFeedback";

export const combineScores = (scores: number[]): number => {
  return scores.reduce((a, b) => a + b, 0) / scores.length;
};

export function adjustScore(
  heuristicScore: number,
  userFeedback: UserFeedback,
  userWeight: number,
  heuristicWeight: number,
): number {
  const averageUserRating =
    (userFeedback.difficultyValue +
      userFeedback.clarityValue +
      userFeedback.satisfactionValue) /
    3;
  return heuristicScore * heuristicWeight + averageUserRating * userWeight;
}
