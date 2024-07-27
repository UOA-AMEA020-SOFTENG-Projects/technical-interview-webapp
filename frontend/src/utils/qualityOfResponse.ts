import { Problem } from "@/types";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_BASE_URL;

const MAX_TEST_RUNS = 10;

// This function updates the weights and bias of the model
export const getUpdatedWeightsAndBias = (
  weights: number[],
  bias: number,
  correctness: boolean,
  hintUsage: boolean,
  numOfTimesTestsRan: number,
  actual: number,
  predictedQualityOfResponse: number,
): [number[], number] => {
  const learningRate: number = 0.01;
  const normalizedNumberOfTestRuns = numOfTimesTestsRan / MAX_TEST_RUNS;
  const correctnessNum = correctness ? 1 : 0;
  const hintUsageNum = hintUsage ? 1 : 0;

  const error = predictedQualityOfResponse - actual;

  weights[0] -= learningRate * error * correctnessNum;
  weights[1] -= learningRate * error * hintUsageNum;
  weights[2] -= learningRate * error * normalizedNumberOfTestRuns;
  const newbias = bias - learningRate * error;

  return [weights, newbias];
};

export const calculateQualityOfResponse = (
  correctness: boolean,
  hintUsage: boolean,
  numberOfTestRuns: number,
  weights: number[],
  bias: number,
) => {
  // Trivial Case 1 - Ran tests lot of times, hence very hard for user
  if (numberOfTestRuns > 10) return 0;

  const correctnessNum = correctness ? 1 : 0;
  const hintUsageNum = hintUsage ? 1 : 0;
  const numberOfTestRunsNormalized = numberOfTestRuns / MAX_TEST_RUNS;

  // Calculate the feedback using the linear equation
  let y =
    weights[0] * correctnessNum +
    weights[1] * hintUsageNum +
    weights[2] * numberOfTestRunsNormalized +
    bias;

  // Round the continuous output to the nearest integer
  let feedbackClass = Math.round(y);

  // Ensure the feedback class is within the valid range (0 to 5)
  feedbackClass = Math.max(0, Math.min(5, feedbackClass));

  return feedbackClass;
};

export const updateQualityOfResponse = async (
  problem: Problem,
  value: any,
  allTestsPassed: boolean,
  timeSpent: number,
  hintUsage: boolean,
  numOfTimesTestsRan: number,
  token: string | null,
  qualityOfResponse: number,
) => {
  try {
    const res = await axios.post(
      `${BaseURL}/user/problem-attempt`,
      {
        problem: problem._id,
        solution: value,
        measuredData: {
          correctness: allTestsPassed,
          timeSpent,
          hintUsage,
          codeEfficiency: 1,
          numberOfTestRuns: numOfTimesTestsRan,
        },
        qualityOfResponse: qualityOfResponse,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getWeightsAndBias = async (token: string | null) => {
  try {
    const res = await axios.get(`${BaseURL}/user/weights-bias`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateWeightsAndBias = async (
  token: string | null,
  weights: number[],
  bias: number,
) => {
  try {
    await axios.patch(
      `${BaseURL}/user/weights-bias`,
      {
        weights: weights,
        bias: bias,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  } catch (error) {
    console.error("Error updating weights and bias:", error);
  }
};
