export interface BoilerplateCode {
  _id: string;
  boilerplate: string;
  language: string;
}

export interface TestCase {
  input: string;
  output: string;
}

export interface Problem {
  __v: number;
  _id: string;
  boilerplateCode: BoilerplateCode[];
  createdAt: string;
  description: string;
  difficulty: string;
  exampleCase: string;
  hint: string;
  modelDescription: string;
  solution: string;
  testCases: TestCase[];
  title: string;
  topic: string;
  updatedAt: string;
}

export interface Topic {
  _id: string;
  title: string;
  problems: Problem[];
  content: string;
}

export interface Content {
  primaryDescription: string;
  secondaryDescription: string;
  videoURL: string;
  code: string;
}
