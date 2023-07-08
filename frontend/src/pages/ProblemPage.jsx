import React from "react";
import { useLoaderData, redirect, json } from 'react-router-dom';
import CodeEditor from "../components/editor/CodeEditor/CodeEditor";

const ProblemPage = () => {

  const problem = useLoaderData();

  console.log("problem: ", problem, 9);

  return (
    <div>
        <CodeEditor problem={problem}/>
    </div>
  );
};

export const loader = async ({ request, params }) => {
  
  const problemId = params.problemId;

  const response = await fetch('http://localhost:3000/problem/' + problemId);

  if (!response.ok) {
      const err = await response.json();

      return json({ message: err.message }, { status: 500 });
  } else {
      const data = await response.json();

      console.log("problem: " + data);

      return data;
  }
}




export default ProblemPage;