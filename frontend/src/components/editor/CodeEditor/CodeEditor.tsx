import { useState, useEffect } from "react";
import "../../../../config/aceConfig.js";
import useSolution from "../../../hooks/useSolution.js";
import AceEditor from "react-ace";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import styles from "./CodeEditor.module.css";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-solarized_light";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-php";
import { Problem } from "@/types.js";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import {
  ButtonGroup,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";

const BaseURL = import.meta.env.VITE_API_BASE_URL;

interface Props {
  problem: Problem;
}

function CodeEditor({ problem }: Props) {
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
  const [modelAnswer, setModelAnswer] = useState("");
  const [testCaseLoading, setTestCaseLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    problem.boilerplateCode[0].language
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [showSolutionModal, setShowSolutionModal] = useState(false);

  const saveSolution = (newValue: string, language: string) => {
    axios
      .post(
        `${BaseURL}/editor/${problem._id}/saveSolution`,
        { code: newValue },
        {
          params: { language_id: language },
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        setErrorMsg(error.message);
        setIsErrorVisible(true);
      });
  };

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

  const dropDownChangeHandler = (event) => {
    setSelectedLanguage(event.target.value);

    // use the hook to get the latest use solution or if none exists then the boilerplate by default
    setLanguage(event.target.value);
  };

  useEffect(() => {
    setValue(data.solution);
  }, [data]);

  // run code: req.body is the code, query param is the selected language
  // run tests: req.body -> code, query param -> language, and path param is problem id

  const submitHandler = async () => {
    try {
      // call endpoint 2 here
      const response = await axios.post(
        `${BaseURL}/editor/code`,
        { code: value },
        { params: { language_id: selectedLanguage } }
      );

      if (response.status !== 200) {
        setErrorMsg("Something went wrong.");
        setIsErrorVisible(true);
        return;
      }

      setOutput(response.data.output);
    } catch (error) {
      setErrorMsg("Code not compiling");
      setIsErrorVisible(true);
    }
  };

  const testSubmitHandler = async () => {
    setTestCaseLoading(true);
    try {
      // call endpoint 3 here
      const response = await axios.post(
        `${BaseURL}/editor/${problem._id}/testCase`,
        { code: value },
        {
          params: { language_id: selectedLanguage },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status !== 200) {
        setErrorMsg("Something went wrong.");
        setIsErrorVisible(true);
        return;
      }

      setTestResults(response.data.testResults);

      // Check if all test cases passed
      const allTestCasesPassed = response.data.testResults.every(
        (result) => result.passed
      );

      if (allTestCasesPassed) {
        toast.success("Problem successfully Completed!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (error) {
      setErrorMsg("Code not compiling");
      setIsErrorVisible(true);
      setTestCaseLoading(false);
    } finally {
      // save the users solution for the problem
      saveSolution(value, selectedLanguage);
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

  const resultSolutionHandler = async () => {
    setValue(problem.boilerplateCode[0].boilerplate);
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
          default={selectedLanguage}
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
            <IconButton onClick={() => setShowHint(true)}>
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
            <IconButton onClick={() => setShowSolutionModal(true)}>
              <ScienceOutlinedIcon />
            </IconButton>
          </Tooltip>
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

      <Modal
        show={showSolutionModal}
        onHide={() => setShowSolutionModal(false)}
        dialogClassName={styles["modal-custom"]}
        aria-labelledby="solution-modal"
      >
        <Modal.Header closeButton className={styles["modal-header"]}>
          <div className={styles["modal-title-wrapper"]}>
            <Modal.Title id="solution-modal">
              <b>Solution</b>
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body className={styles["modal-back"]}>
          <pre>{problem.solution}</pre>
        </Modal.Body>
      </Modal>

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
    </div>
  );
}

export default CodeEditor;
