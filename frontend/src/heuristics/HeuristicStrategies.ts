import { Metrics } from "./Metrics";

export interface HeuristicStrategy {
  execute(metrics: Metrics): number;
}

export class TimeSpentHeuristic implements HeuristicStrategy {
  execute(metrics: Metrics): number {
    return 0;
  }
}

export class CorrectnessHeuristic implements HeuristicStrategy {
  execute(metrics: Metrics): number {
    return metrics.correctness && metrics.numberOfTestRuns === 0 ? 5 : 0;
  }
}

export class HintUsageHeuristic implements HeuristicStrategy {
  execute(metrics: Metrics): number {
    return 0;
  }
}

export class CodeEfficiencyHeuristic implements HeuristicStrategy {
  execute(metrics: Metrics): number {
    return 0;
  }
}
