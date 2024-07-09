import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import AceEditor from "react-ace";
import Badge from "react-bootstrap/Badge";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../config/aceConfig.js";
import useSolution from "../../../hooks/useSolution.js";
import styles from "./CodeEditor.module.css";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-solarized_light";

import { Problem } from "@/types.js";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Slider,
  Tooltip,
  Typography,
} from "@mui/material";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/snippets/java";
import { useNavigate } from "react-router-dom";
import TimerDisplay from "./TimerDisplay.js";

const BaseURL = import.meta.env.VITE_API_BASE_URL;

interface Props {
  problem: Problem;
}

interface TestResult {
  passed: boolean;
  testcase: string;
  input: string;
  expectedOutput: string;
  actualOutput: string;
}

function CodeEditor({ problem }: Props) {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const { data, isLoading, error, refetch, setLanguage } = useSolution(
    `${BaseURL}/problem/${problem._id}/codecontent`,
    "GET",
    true,
    token,
    problem.boilerplateCode[0].language
  );

  const [value, setValue] = useState(problem.boilerplateCode[0].boilerplate);
  const [output, setOutput] = useState("");
  const [similarity, setSimilarity] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [shouldSaveSolution, setShouldSaveSolution] = useState(true);
  const [modelAnswer, setModelAnswer] = useState("");
  const [testCaseLoading, setTestCaseLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    problem.boilerplateCode[0].language
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [difficultyValue, setDifficultyValue] = useState(3);
  const [clarityValue, setClarityValue] = useState(3);
  const [satisfactionValue, setSatisfactionValue] = useState(3);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [hintUsage, setHintUsage] = useState(false);
  const [currentAttemptId, setCurrentAttemptId] = useState("");

  const handleDifficultyChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setDifficultyValue(newValue as number);
  };

  const handleClarityChange = (event: Event, newValue: number | number[]) => {
    setClarityValue(newValue as number);
  };

  const handleSatisfactionChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setSatisfactionValue(newValue as number);
  };

  const saveSolution = useCallback(
    (currentValue: string, currentLanguage: string) => {
      axios
        .post(
          `${BaseURL}/editor/${problem._id}/saveSolution`,
          { code: currentValue },
          {
            params: { language_id: currentLanguage },
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log("Solution saved:", response.data);
        })
        .catch((error) => {
          console.error("Error saving solution:", error);
          setErrorMsg("Failed to save solution: " + error.message);
          setIsErrorVisible(true);
        });
    },
    [problem._id, token]
  );

  const userInputHandler = (newValue: string) => {
    setValue(newValue);
  };

  // update the language mode of the editor based on the language selected
  const getAceMode = (language: string) => {
    switch (language) {
      case "java":
        return "java";
      case "c":
      case "cpp":
        return "c_cpp";
      case "python3":
        return "python";
      default:
        return "text"; // Default mode
    }
  };

  const dropDownChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(event.target.value);

    // use the hook to get the latest use solution or if none exists then the boilerplate by default
    setLanguage(event.target.value);
  };

  useEffect(() => {
    setValue(data.solution);
  }, [data]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      shouldSaveSolution && saveSolution(value, selectedLanguage);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [value, selectedLanguage, problem._id, shouldSaveSolution, saveSolution]);

  // run code: req.body is the code, query param is the selected language
  // run tests: req.body -> code, query param -> language, and path param is problem id

  const submitHandler = async () => {
    try {
      const testResponse = await axios.post(
        `${BaseURL}/editor/${problem._id}/testCase`,
        { code: value },
        {
          params: { language_id: selectedLanguage },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (testResponse.status !== 200) {
        setErrorMsg("Something went wrong.");
        setIsErrorVisible(true);
        return;
      }

      setShouldSaveSolution(false);

      if (testResponse.data.outcome === 11) {
        setOutput(testResponse.data.error);
        setTestResults([]);

        setErrorMsg("Code not compiling");
        setIsErrorVisible(true);
        return;
      }

      const { data } = testResponse;
      let allTestsPassed = false;

      if (data && data.testResults) {
        allTestsPassed = data.testResults.every((test) => test.passed);
      }

      const response = await axios.post(
        `${BaseURL}/user/problem-attempt`,
        {
          problem: problem._id,
          solution: value,
          measuredData: {
            correctness: allTestsPassed,
            timeSpent,
            hintUsage,
            codeEfficiency: 1,
          },
          qualityOfResponse: 0,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        setModalOpen(true);
        setCurrentAttemptId(response.data.attemptId);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Error submitting attempt");
      setIsErrorVisible(true);
    }
  };

  const handleSliderSubmit = async () => {
    if (currentAttemptId) {
      try {
        await axios.patch(
          `${BaseURL}/user/problem-attempt/${currentAttemptId}`,
          {
            userFeedback: {
              difficulty: difficultyValue,
              confidence: clarityValue,
              understanding: satisfactionValue,
            },
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (error) {
        console.error("Error updating user feedback:", error);
      }
    }
    await axios.delete(`${BaseURL}/editor/${problem._id}/clearSolution`, {
      params: { language_id: selectedLanguage },
      headers: { Authorization: `Bearer ${token}` },
    });
    setModalOpen(false);

    navigate("/home/dashboard");
  };

  const testSubmitHandler = async () => {
    setTestCaseLoading(true);
    try {
      const response = await axios.post(
        `${BaseURL}/editor/${problem._id}/testCase`,
        { code: value },
        {
          params: { language_id: selectedLanguage },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setTestResults(response.data.testResults);

        const allTestCasesPassed = response.data.testResults.every(
          (result: any) => result.passed
        );

        if (allTestCasesPassed) {
          toast.success("Problem successfully Completed!", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }

        if (currentAttemptId) {
          await axios.patch(
            `${BaseURL}/user/problem-attempt/${currentAttemptId}`,
            {
              measuredData: {
                correctness: allTestCasesPassed,
              },
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }
      }
    } catch (error) {
      setErrorMsg("Code not compiling");
      setIsErrorVisible(true);
    } finally {
      setTestCaseLoading(false);
    }
  };

  useEffect(() => {
    if (isErrorVisible) {
      const timer = setTimeout(() => {
        setIsErrorVisible(false);
      }, 2000); // Change this value to adjust the delay

      return () => clearTimeout(timer);
    }
  }, [isErrorVisible]);

  const resultSolutionHandler = () => {
    setValue(problem.boilerplateCode[0].boilerplate);
  };

  const handleShowSolution = () => {
    setValue(problem.solution);
    setHintUsage(true);
    if (currentAttemptId) {
      axios.patch(
        `${BaseURL}/user/problem-attempt/${currentAttemptId}`,
        {
          measuredData: {
            hintUsage: true,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
  };

  return (
    <div className={styles.editorWrapper}>
      <div className={styles.editorDesc}>
        <div className={styles.editorTitle}>
          <Typography variant="h4">{problem.title}</Typography>
          <Badge style={{ marginLeft: "5px", padding: "7px" }} bg="success">
            {problem.difficulty}
          </Badge>
        </div>

        <p>{problem.description}</p>
        <h5>Example case: </h5>
        <p>
          {problem.exampleCase
            .split("Explanation:")
            .flatMap((item, index) =>
              index !== 0
                ? [
                    <br key={`explanation-${index}`} />,
                    <strong key={`explanation-strong-${index}`}>
                      Explanation:
                    </strong>,
                    ...item
                      .split("Output:")
                      .flatMap((outputItem, outputIndex) =>
                        outputIndex !== 0
                          ? [
                              <br key={`output-${outputIndex}`} />,
                              <strong key={`output-strong-${outputIndex}`}>
                                Output:
                              </strong>,
                              ...outputItem
                                .split("Input:")
                                .flatMap((inputItem, inputIndex) =>
                                  inputIndex !== 0
                                    ? [
                                        <strong
                                          key={`input-strong-${inputIndex}`}
                                        >
                                          Input:
                                        </strong>,
                                        inputItem,
                                      ]
                                    : [inputItem]
                                ),
                            ]
                          : outputItem
                              .split("Input:")
                              .flatMap((inputItem, inputIndex) =>
                                inputIndex !== 0
                                  ? [
                                      <strong
                                        key={`input-strong-${inputIndex}`}
                                      >
                                        Input:
                                      </strong>,
                                      inputItem,
                                    ]
                                  : [inputItem]
                              )
                      ),
                  ]
                : item
                    .split("Output:")
                    .flatMap((outputItem, outputIndex) =>
                      outputIndex !== 0
                        ? [
                            <br key={`output-${outputIndex}`} />,
                            <strong key={`output-strong-${outputIndex}`}>
                              Output:
                            </strong>,
                            ...outputItem
                              .split("Input:")
                              .flatMap((inputItem, inputIndex) =>
                                inputIndex !== 0
                                  ? [
                                      <strong
                                        key={`input-strong-${inputIndex}`}
                                      >
                                        Input:
                                      </strong>,
                                      inputItem,
                                    ]
                                  : [inputItem]
                              ),
                          ]
                        : outputItem
                            .split("Input:")
                            .flatMap((inputItem, inputIndex) =>
                              inputIndex !== 0
                                ? [
                                    <strong key={`input-strong-${inputIndex}`}>
                                      Input:
                                    </strong>,
                                    inputItem,
                                  ]
                                : [inputItem]
                            )
                    )
            )}
        </p>

        <p>{`Selected language is ${selectedLanguage}`}</p>
        <select
          value={selectedLanguage}
          defaultValue={selectedLanguage}
          onChange={dropDownChangeHandler}
        >
          {problem.boilerplateCode.map((boilerplate, index) => (
            <option key={index} value={boilerplate.language}>
              {boilerplate.language}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.editorCodeContainer}>
        <ButtonGroup variant="outlined">
          <Button color="success" variant="text" onClick={submitHandler}>
            <PublishRoundedIcon /> Submit
          </Button>
          <Divider
            sx={{ borderRightWidth: 2, borderColor: "#757575" }}
            orientation="vertical"
            variant="middle"
            flexItem
          />
          <Tooltip title="Run Tests">
            <IconButton onClick={testSubmitHandler}>
              <PlayCircleFilledWhiteOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Divider
            sx={{ borderRightWidth: 2, borderColor: "#757575" }}
            orientation="vertical"
            variant="middle"
            flexItem
          />
          <Tooltip title="Reset Solution">
            <IconButton onClick={resultSolutionHandler}>
              <RefreshOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Divider
            sx={{ borderRightWidth: 2, borderColor: "#757575" }}
            orientation="vertical"
            variant="middle"
            flexItem
          />
          <Tooltip title="Show Hint">
            <IconButton
              onClick={() => {
                setShowHint(true);
                setHintUsage(true);
              }}
            >
              <LightbulbOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Divider
            sx={{ borderRightWidth: 2, borderColor: "#757575" }}
            orientation="vertical"
            variant="middle"
            flexItem
          />
          <Tooltip title="Show Solution">
            <IconButton onClick={handleShowSolution}>
              <ScienceOutlinedIcon />
            </IconButton>
          </Tooltip>
          <TimerDisplay
            setIsTimerRunning={setIsTimerRunning}
            setTimeSpent={setTimeSpent}
            timeSpent={timeSpent}
            isTimerRunning={isTimerRunning}
          />
        </ButtonGroup>
        <AceEditor
          className={styles.editorCode}
          mode={getAceMode(selectedLanguage)}
          theme={"solarized_light"}
          onChange={userInputHandler}
          name="editor"
          editorProps={{ $blockScrolling: true }}
          value={isLoading ? "loading..." : value}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />

        <div className={styles.editorOutput}>
          <div
            style={{
              backgroundColor: "#8FAC51",
              borderRadius: "10px",
              padding: "20px",
              overflow: "auto",
            }}
          >
            <h3>Test Case Results: </h3>
            {testResults.map((result, index) => (
              <div key={index} style={{ paddingTop: "0.5rem" }}>
                <hr></hr>
                <p>
                  <b>Test Case</b> {result.testcase}:
                  {result.passed ? (
                    <span
                      style={{
                        color: "green",
                        fontWeight: "bold",
                        paddingLeft: "10px",
                      }}
                    >
                      ✔ Passed
                    </span>
                  ) : (
                    <span
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        paddingLeft: "10px",
                      }}
                    >
                      ✘ Failed
                    </span>
                  )}
                </p>
                <p>
                  <b>Input:</b> {result.input}
                </p>
                <p>
                  <b>Expected Output:</b> {result.expectedOutput}
                </p>
                <p>
                  <b>Actual Output:</b> {result.actualOutput}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              backgroundColor: "#8FAC51",
              borderRadius: "10px",
              padding: "20px",
              overflow: "auto",
            }}
          >
            <h3>Output: </h3>
            <p>{output}</p>
          </div>
        </div>
      </div>

      {showHint && (
        <div style={{ marginTop: "1rem" }}>
          <p>
            <b>Hint:</b> {problem.hint}
          </p>
        </div>
      )}

      {showFeedback && (
        <div style={{ marginTop: "2%" }}>
          <p>
            <b>Similarity score: </b>
            {similarity}%
          </p>
          <p>
            <b>Feedback: </b>
            {feedback}
          </p>
          <p>"{modelAnswer}"</p>
        </div>
      )}

      {isErrorVisible && (
        <div
          style={{
            position: "fixed",
            bottom: 10,
            left: 10,
            backgroundColor: "red",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {errorMsg}
        </div>
      )}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            maxWidth: "800px",
            height: "auto",
            paddingX: "40px",
          },
        }}
      >
        <DialogTitle>Difficulty Rating</DialogTitle>
        <DialogContent sx={{ overflowY: "visible" }}>
          <Typography variant="h6" gutterBottom>
            How would you rate the difficulty of this problem?
          </Typography>
          <Box mt={2}>
            <Slider
              value={difficultyValue}
              onChange={handleDifficultyChange}
              step={1}
              min={1}
              max={5}
              valueLabelDisplay="auto"
              marks={[
                { value: 1, label: "Easy" },
                { value: 2, label: "Moderate" },
                { value: 3, label: "Medium" },
                { value: 4, label: "Hard" },
                { value: 5, label: "Very Hard" },
              ]}
            />
          </Box>

          <Typography variant="h6" gutterBottom>
            How confident are you that you can do this again in an interview?
          </Typography>
          <Box mt={2}>
            <Slider
              value={clarityValue}
              onChange={handleClarityChange}
              step={1}
              min={1}
              max={5}
              valueLabelDisplay="auto"
              marks={[
                { value: 1, label: "Not at all confident" },
                { value: 2, label: "Slightly confident" },
                { value: 3, label: "Moderately confident" },
                { value: 4, label: "Very confident" },
                { value: 5, label: "Extremely confident" },
              ]}
            />
          </Box>

          <Typography variant="h6" gutterBottom>
            How well do you understand the solution?
          </Typography>
          <Box mt={2}>
            <Slider
              value={satisfactionValue}
              onChange={handleSatisfactionChange}
              step={1}
              min={1}
              max={5}
              valueLabelDisplay="auto"
              marks={[
                { value: 1, label: "Don't understand at all" },
                { value: 2, label: "Understand a little" },
                { value: 3, label: "Understand somewhat" },
                { value: 4, label: "Understand well" },
                { value: 5, label: "Understand completely" },
              ]}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSliderSubmit()}>Submit</Button>
          <Button onClick={() => setModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CodeEditor;
