export interface Problem {
  _id: string;
  title: string;
  difficulty: string;
}

export interface Topic {
  _id: string;
  title: string;
  problems: Problem[];
}
