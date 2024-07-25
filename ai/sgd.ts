// This is the implementation of the Stochastic Gradient Descent algorithm
// This algorithm is used to train the model using the user metrics data
// The model is a linear regression model that predicts the feedback class based on the user metrics
// The model is defined by the equation:
// y = w_1 * correctness + w_2 * hintUsage + w_3 * numberOfTestRuns + bias

// Initialize the weights and bias with random values
let weights: number[] = Array.from({ length: 3 }, () => Math.random());
let bias: number = Math.random();

// TODO - Check this value, how else can we define max test runs
const MAX_TEST_RUNS = 10; // We will set a maximum number of test runs to 10, after that the quality becomes 5

// Define the prediction function
const predict = (
  correctness: number,
  hintUsage: number,
  numberOfTestRuns: number,
  weights: number[],
  bias: number,
): number => {
  return (
    weights[0] * correctness +
    weights[1] * hintUsage +
    weights[2] * numberOfTestRuns +
    bias
  );
};

// This function updates the weights and bias of the model
const updateWeights = (
  weights: number[],
  bias: number,
  correctness: boolean,
  hintUsage: boolean,
  numberOfTestRuns: number,
  actual: number,
  learningRate: number = 0.01,
): [number[], number] => {
  const normalizedNumberOfTestRuns = numberOfTestRuns / MAX_TEST_RUNS;
  const correctnessNum = correctness ? 1 : 0;
  const hintUsageNum = hintUsage ? 1 : 0;

  const prediction = predict(
    correctnessNum,
    hintUsageNum,
    numberOfTestRuns,
    weights,
    bias,
  );
  const error = prediction - actual;

  weights[0] -= learningRate * error * correctnessNum;
  weights[1] -= learningRate * error * hintUsageNum;
  weights[2] -= learningRate * error * normalizedNumberOfTestRuns;
  bias -= learningRate * error;

  return [weights, bias];
};

// Example input data we will get when user does the questions
// correctness, hintUsage, numberOfTestsRun and actualFeedback (average of the survey questions after submitting the question)
const userMetrics: [boolean, boolean, number, number][] = [
  [true, true, 5, 2],
  [false, true, 10, 0],
  [true, false, 2, 5],
  [false, false, 7, 5],
  [true, true, 3, 2],
  [false, true, 8, 5],
  [true, false, 1, 0],
  [true, true, 6, 2],
];

// Update the model using the user metrics data every time the user does a question
userMetrics.forEach(
  ([correctness, hintUsage, numberOfTestRuns, actualFeedback]) => {
    [weights, bias] = updateWeights(
      weights,
      bias,
      correctness,
      hintUsage,
      numberOfTestRuns,
      actualFeedback,
    );
  },
);

// Function to calculate the quality based on the data
const calculateQuality = (
  correctness: boolean,
  hintUsage: boolean,
  numberOfTestRuns: number,
  weights: number[],
  bias: number,
): number => {
  const correctnessNum = correctness ? 1 : 0;
  const hintUsageNum = hintUsage ? 1 : 0;

  // Calculate the feedback using the linear equation
  let y =
    weights[0] * correctnessNum +
    weights[1] * hintUsageNum +
    weights[2] * numberOfTestRuns +
    bias;

  // Round the continuous output to the nearest integer
  let feedbackClass = Math.round(y);

  // Ensure the feedback class is within the valid range (0 to 5)
  feedbackClass = Math.max(0, Math.min(5, feedbackClass));

  return feedbackClass;
};

console.log(calculateQuality(false, true, 10, weights, bias)); // This should be a lower number since user got it wrong and used a lot of test runs
console.log(calculateQuality(true, false, 0, weights, bias)); // This should be a higher number since user got it right and didn't use any test runs, neither hints
