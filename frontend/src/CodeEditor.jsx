import { useState, useEffect } from "react";
import AceEditor from "react-ace";
import axios from 'axios';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/java";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-php";

const PROBLEM_ID = "64a549f0b23e2af9677c9243";

function CodeEditor() {
  const [value, setValue] = useState("");
  const [output, setOutput] = useState("");
  const [similarity, setSimilarity] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [errorMsg, setErrorMsg] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [testResults, setTestResults] = useState([]);


  const userInputHandler = (newValue) => {
    setValue(newValue);
  };

  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const dropDownChangeHandler = (event) => {
    setSelectedLanguage(event.target.value);
  };

  /**
   * When an input is being supplied, the input can't come from the command line, it must be accepted as stdin 
   * e.g.) using scanner in java or input() in python
   */

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
      setErrorMsg(error.message);
      setIsErrorVisible(true);
    }
  };

  const testSubmitHandler = async () => {
    try {
      // call endpoint 3 here
      const response = await axios.post(
        `http://localhost:3000/editor/${PROBLEM_ID}/testCase`,
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
      setErrorMsg(error.message);
      setIsErrorVisible(true);
    }
  }

  const submitExplanationHandler = async () => {
    // call endpoint 1 here
  
    // make fetch call to submit the text description of the answer
    let textDescription = {
      answer: description,
    };
  
    try {
      const similarityResponse = await axios.put(
        "http://localhost:3000/editor/similarity/" + PROBLEM_ID,
        textDescription,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const similarityScore = similarityResponse.data;
  
      // update the state variables with the new values so that the component rerenders and they display at the same time
      setOutput(output.stdout);
      setSimilarity(similarityScore.similarityScore);
  
      // reset 
      setDescription("");
    } catch (error) {
      console.log("status: " + error.response.status);
      console.log("err" + output.stderr);
      setErrorMsg("Something went wrong.");
      setIsErrorVisible(true);
    }
  }

  useEffect(() => {
    if (isErrorVisible) {
      const timer = setTimeout(() => {
        setIsErrorVisible(false);
      }, 2000); // Change this value to adjust the delay

      return () => clearTimeout(timer);
    }
  }, [isErrorVisible]);

  return (
    <>
      <div style={{ paddingBottom: "5px" }}>
        <p>{`Selected language is ${selectedLanguage}`}</p>
        <select
          value={selectedLanguage}
          default={selectedLanguage}
          onChange={dropDownChangeHandler}
        >
          <option value="c">C</option>
          <option value="java">Java</option>
          <option value="nodejs">NodeJS</option>
          <option value="python3">Python</option>
          <option value="php">Php</option>
          <option value="cpp">C++</option>
          <option value="pascal">Pascal</option>
        </select>
      </div>
      <div>
        <AceEditor
          mode="java"
          theme="monokai"
          onChange={userInputHandler}
          name="editor"
          editorProps={{ $blockScrolling: true }}
          value={value}
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
        />
      </div>
      <div style={{ marginTop: "5%" }}>
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
      </div>
      <div style={{ paddingTop: "7px" }}>
        <button onClick={submitHandler}>Run Code</button>
        <button onClick={testSubmitHandler}>Run Test Cases</button>
        <button onClick={submitExplanationHandler}>Submit Explanation</button>
      </div>
      <div>
        <h3>Output: </h3>
        <p>{output}</p>
      </div>
      <div style={{ marginTop: "5%" }}>
        <h3>
          Similarity with the correct model answer (the closer to 1 the
          better!):
        </h3>
        <p>{similarity}</p>
      </div>
      <div>
        {/* Display the test case results here */}
        <h3>Test Case Results: </h3>
        {testResults.map((result, index) => (
          <p key={index}>Test Case {result.testcase}: {result.passed ? "Passed" : "Failed"}</p>
        ))}
      </div>
      {isErrorVisible && (
        <div
          style={{
            position: "fixed",
            bottom: 10,
            left: 10,
            backgroundColor: "red",
            color: "white",
            padding: "5px",
          }}
        >
          {errorMsg}
        </div>
      )}
    </>
  );
}

export default CodeEditor;
