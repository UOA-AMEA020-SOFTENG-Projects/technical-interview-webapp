import { HeuristicStrategy } from "./HeuristicStrategies";
import { Metrics } from "./Metrics";

export class HeuristicPipeline {
  private strategies: HeuristicStrategy[] = [];

  addStrategy(strategy: HeuristicStrategy): void {
    this.strategies.push(strategy);
  }

  execute(metrics: Metrics): number[] {
    return this.strategies.map((strategy) => strategy.execute(metrics));
  }
}

export const combineScores = (scores: number[]): number => {
  return scores.reduce((a, b) => a + b, 0) / scores.length;
};
