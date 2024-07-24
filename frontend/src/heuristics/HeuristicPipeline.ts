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
