import React from "react";
import { useLoaderData, redirect, json } from 'react-router-dom';
import QuestionnaireForm from "../components/questionnaire/QuestionnaireForm";

const QuestionnairePage = () => {
  
    const questions = useLoaderData();

    return (
        <QuestionnaireForm questions={questions}/>
    );
};

export default QuestionnairePage;

export const loader = async ({ request, params }) => {


    const response = await fetch('http://localhost:3000/questions');
  
    if (!response.ok) {
        const err = await response.json();
  
        return json({ message: err.message }, { status: 500 });
    } else {
        const data = await response.json();
  
        console.log("questions: " + data, 25);
  
        return data;
    }
}