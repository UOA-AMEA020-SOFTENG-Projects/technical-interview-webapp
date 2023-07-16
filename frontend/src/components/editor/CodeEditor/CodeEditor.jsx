import { useState, useEffect } from "react";
import "../../../../config/aceConfig.js";
import useSolution from "../../../hooks/useSolution";
import useUpdateSolution from "../../../hooks/useUpdateSolution";
import AceEditor from "react-ace";
import { Modal, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import styles from "./CodeEditor.module.css";
import { themes } from "../../../../config/themes.js";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/theme-textmate";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-php";

function CodeEditor({ problem }) {
  const token = localStorage.getItem("authToken");

  // FIX REQUIRED FOR ENDPOINT: if the code submitted is the same as the boilerplate then dont add entry to user schema
  const { data, isLoading, error, refetch, setLanguage } = useSolution(
    `http://localhost:3000/problem/${problem._id}/codecontent`,
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
  const [selectedLanguage, setSelectedLanguage] = useState(
    problem.boilerplateCode[0].language
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [testResults, setTestResults] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("xcode");
  const [showHint, setShowHint] = useState(false);
  const [showSolutionModal, setShowSolutionModal] = useState(false);

  const saveSolution = (newValue, language) => {
    axios
      .post(
        `http://localhost:3000/editor/${problem._id}/saveSolution`,
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

  const userInputHandler = (newValue) => {
    setValue(newValue);
  };

  const themeChangeHandler = (event) => {
    setSelectedTheme(event.target.value);
  };

  // update the language mode of the editor based on the language selected
  const getAceMode = (language) => {
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

  const descriptionHandler = (event) => {
    setDescription(event.target.value);
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
        "http://localhost:3000/editor/code",
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
    try {
      // call endpoint 3 here
      const response = await axios.post(
        `http://localhost:3000/editor/${problem._id}/testCase`,
        { code: value },
        { params: { language_id: selectedLanguage } }
      );

      if (response.status !== 200) {
        setErrorMsg("Something went wrong.");
        setIsErrorVisible(true);
        return;
      }

      setTestResults(response.data.testResults);
    } catch (error) {
      setErrorMsg("Code not compiling");
      setIsErrorVisible(true);
    } finally {
      // save the users solution for the problem
      saveSolution(value, selectedLanguage);
    }
  };

  const submitExplanationHandler = async () => {
    setLoading(true); // start loading
    let textDescription = {
      answer: description,
    };

    try {
      const similarityResponse = await axios.put(
        "http://localhost:3000/editor/similarity/" + problem._id,
        textDescription,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const similarityScore = similarityResponse.data;

      setSimilarity(similarityScore.similarityScore);
      setModelAnswer(similarityScore.modelAnswer);
      setFeedback(similarityScore.feedback);

      setShowFeedback(true);
      setLoading(false); // stop loading
    } catch (error) {
      console.log("Error: " + error.message);
      setErrorMsg("Something went wrong.");
      setIsErrorVisible(true);
      setLoading(false); // stop loading
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
    // make request to endpoint to reset the solution back to the boilerplate
    try {
      const response = await fetch(
        `http://localhost:3000/editor/${problem._id}/clearSolution?language_id=${selectedLanguage}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Solution has already been cleared");
        }

        throw new Error("Something went wrong");
      }

      const responseData = await response.json();

      console.log(responseData.message);
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMsg(error.message);
      setIsErrorVisible(true);
    } finally {
      // then load the code for the editor again from the custom hook to update
      refetch();
    }
  };

  return (
    <div className={styles.editorWrapper}>
      <div>
        <h2>{problem.title}</h2>
        <p>{problem.description}</p>
      </div>
      <div
        style={{
          paddingBottom: "5px",
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "65%",
        }}
      >
        <div>
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
        <div>
          <p>{`Selected theme is ${selectedTheme}`}</p>
          <select value={selectedTheme} onChange={themeChangeHandler}>
            {themes.map((theme, index) => (
              <option key={index} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "65%" }}>
          <AceEditor
            mode={getAceMode(selectedLanguage)}
            theme={selectedTheme}
            onChange={userInputHandler}
            name="editor"
            editorProps={{ $blockScrolling: true }}
            value={isLoading ? "loading..." : value}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
            width="100%"
            height="600px"
          />
          <Button
            variant="outline-dark"
            onClick={resultSolutionHandler}
            style={{ marginTop: "1rem" }}
          >
            Reset Solution
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => setShowHint(true)}
            style={{ marginTop: "1rem", marginLeft: "1rem" }}
          >
            Show Hint
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => setShowSolutionModal(true)}
            style={{ marginTop: "1rem", marginLeft: "1rem" }}
          >
            Show Solution
          </Button>
        </div>
        <div style={{ width: "30%" }}>
          <div
            style={{
              backgroundColor: "#8FAC51",
              height: "20rem",
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
              backgroundColor: "#660000",
              height: "10rem",
              borderRadius: "10px",
              padding: "20px",
              overflow: "auto",
              marginTop: "2%",
            }}
          >
            <h3>Output: </h3>
            <p>{output}</p>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <Button
              variant="outline-dark"
              style={{ marginRight: "1rem" }}
              onClick={submitHandler}
            >
              Run Code
            </Button>
            <Button variant="outline-dark" onClick={testSubmitHandler}>
              Run Test Cases
            </Button>
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
      <div style={{ marginTop: "5%", width: "100%", position: "relative" }}>
        <textarea
          value={description}
          onChange={descriptionHandler}
          placeholder="Enter a verbal description of your solution and thought process here..."
          style={{
            width: "100%",
            height: "100px",
            backgroundColor: "#4A4A4A",
            color: "#FFFFFF",
            borderRadius: "5px",
            padding: "10px",
            fontSize: "16px",
            border: "none",
          }}
        />
        {loading && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="success" />
          </div>
        )}
      </div>

      <div style={{ paddingTop: "7px" }}>
        <Button variant="outline-dark" onClick={submitExplanationHandler}>
          Submit Explanation
        </Button>
      </div>
      {showFeedback && (
        <div style={{ marginTop: "2%" }}>
          <p>
            <b>Similarity score: </b>
            {similarity}
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
