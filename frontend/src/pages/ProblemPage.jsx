import React from "react";
import { useLoaderData, redirect, json } from 'react-router-dom';
import CodeEditor from "../components/editor/CodeEditor/CodeEditor";

const BaseURL = import.meta.env.VITE_API_BASE_URL;

const ProblemPage = () => {

  const problem = useLoaderData();

  return (
    <div>
        <CodeEditor problem={problem}/>
    </div>
  );
};

export const loader = async ({ request, params }) => {
  
  const problemId = params.problemId;

  const response = await fetch(`${BaseURL}/problem/` + problemId);

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