import { useState, useEffect } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/java";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-php";

function CodeEditor() {
  const [value, setValue] = useState("");
  const [output, setOutput] = useState("");
  const [similarity, setSimilarity] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [fileName, setFileName] = useState("javaOutput.java");
  const [errorMsg, setErrorMsg] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [description, setDescription] = useState("");

  const userInputHandler = (newValue) => {
    setValue(newValue);
  };

  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const dropDownChangeHandler = (event) => {
    setSelectedLanguage(event.target.value);

    // set the output filename and ext based on the language chosen
    switch (event.target.value) {
      case "c":
        setFileName(event.target.value + "-output.c");
        break;
      case "java":
        setFileName(event.target.value + "Output.java");
        break;
      case "nodejs":
        setFileName(event.target.value + "-output.js");
        break;
      case "python3":
        setFileName(event.target.value + "-output.py");
        break;
      case "cpp":
        setFileName(event.target.value + "-output.cpp");
        break;
      case "php":
        setFileName(event.target.value + "-output.php");
        break;
      default:
        console.log("Please select a valid language");
    }
  };

  /**
   * When an input is being supplied, the input can't come from the command line, it must be accepted as stdin 
   * e.g.) using scanner in java or input() in python
   */

  const submitHandler = () => {
    const codeData = {
      run_spec: {
        language_id: selectedLanguage,
        sourcefilename: fileName,
        sourcecode: value,
        input: "3 1221",
      },
    };
    submitCode(codeData);
  };

  const submitCode = async (code) => {
    // make fetch call to submit the code

    const textResponse = await fetch(
      "http://localhost:4000/jobe/index.php/restapi/runs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(code),
      }
    );

    if (!textResponse.ok) {
      console.log("status: " + textResponse.status);
      setErrorMsg("Something went wrong.");
      setIsErrorVisible(true);
      return;
    }

    const output = await textResponse.json();

    console.log(output);

    if (output.outcome !== 15) {
      setErrorMsg("Something went wrong.");
      setIsErrorVisible(true);
      return;
    }

    // make fetch call to submit the text description of the answer

    let textDescription = {
      answer: description,
    };

    const similarityResponse = await fetch(
      "http://localhost:3000/editor/similarity",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(textDescription),
      }
    );

    if (!similarityResponse.ok) {
      console.log("status: " + similarityResponse.status);
      console.log("err" + output.stderr);
      setErrorMsg("Something went wrong.");
      setIsErrorVisible(true);
      return;
    }

    const similarityScore = await similarityResponse.json();

    // update the state variables with the new values so that the component rerenders and they display at the same time
    setOutput(output.stdout);
    setSimilarity(similarityScore.similarityScore);

    // reset 
    setDescription("");
  };

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
        <button onClick={submitHandler}>Run</button>
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
