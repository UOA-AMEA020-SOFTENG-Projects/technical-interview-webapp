export interface Problem {
  _id: string;
  title: string;
}

export interface Topic {
  _id: string;
  title: string;
  problems: Problem[];
}
