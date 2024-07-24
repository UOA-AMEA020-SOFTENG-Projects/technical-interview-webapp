export class Metrics {
  constructor(
    public timeSpent: number,
    public correctness: boolean,
    public hintUsage: boolean,
    public codeEfficiency: number,
    public numberOfTestRuns: number,
  ) {}
}
