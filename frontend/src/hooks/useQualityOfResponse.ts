import {
  calculateQualityOfResponse,
  getUpdatedWeightsAndBias,
  getWeightsAndBias,
  updateWeightsAndBias,
} from "../utils/qualityOfResponse";
import { useEffect, useState } from "react";

const useQualityOfResponse = (token: string | null) => {
  const [weights, setWeights] = useState<number[]>([]);
  const [bias, setBias] = useState<number>(0);
  const [qualityOfResponse, setQualityOfResponse] = useState<number>(0);

  useEffect(() => {
    const fetch = async () => {
      const response = await getWeightsAndBias(token);
      setWeights(response.weights);
      setBias(response.bias);
    };

    fetch();
  }, [token]);

  const handleUpdateWeightsAndBias = async (
    hintUsage: boolean,
    correctness: boolean,
    numOfTimesTestsRan: number,
    userFeedback: {
      difficultyValue: number;
      clarityValue: number;
      satisfactionValue: number;
    },
  ) => {
    const userFeedbackAvg =
      (userFeedback.difficultyValue +
        userFeedback.clarityValue +
        userFeedback.satisfactionValue) /
      3;

    // Limit max number of times tests ran to 10
    const cappeddNumOfTimesTestsRan = Math.min(10, numOfTimesTestsRan);

    const [newWeights, newBias] = getUpdatedWeightsAndBias(
      [...weights],
      bias,
      correctness,
      hintUsage,
      cappeddNumOfTimesTestsRan,
      userFeedbackAvg,
      qualityOfResponse,
    );

    setWeights(newWeights);
    setBias(newBias);

    await updateWeightsAndBias(token, newWeights, newBias);
  };

  const handleUpdateQualityOfResponse = (
    allTestsPassed: boolean,
    hintUsage: boolean,
    numOfTimesTestsRan: number,
  ) => {
    const qualityOfResponse = calculateQualityOfResponse(
      allTestsPassed,
      hintUsage,
      numOfTimesTestsRan,
      weights,
      bias,
    );
    setQualityOfResponse(qualityOfResponse);

    return qualityOfResponse;
  };

  return {
    data: { weights, bias, qualityOfResponse },
    operations: { handleUpdateWeightsAndBias, handleUpdateQualityOfResponse },
  };
};

export default useQualityOfResponse;
