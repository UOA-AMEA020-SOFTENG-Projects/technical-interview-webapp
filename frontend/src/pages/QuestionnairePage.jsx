import React from "react";
import { useLoaderData, redirect, json } from "react-router-dom";
import QuestionnaireForm from "../components/questionnaire/QuestionnaireForm";

const BaseURL = import.meta.env.VITE_API_BASE_URL;

const QuestionnairePage = () => {
  const questions = useLoaderData();

  return <QuestionnaireForm questions={questions} />;
};

export default QuestionnairePage;

export const loader = async ({ request, params }) => {
  const response = await fetch(`${BaseURL}/questions`);

  if (!response.ok) {
    const err = await response.json();

    return json({ message: err.message }, { status: 500 });
  } else {
    const data = await response.json();

    return data;
  }
};
