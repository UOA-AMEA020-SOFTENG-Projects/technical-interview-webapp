import { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools"; 
import "ace-builds/src-noconflict/snippets/java"; 


function CodeEditor() {
  const [value, setValue] = useState("");
  const [output, setOutput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [fileName, setFileName] = useState("javaOutput.java");

  const userInputHandler = (newValue) => {
    setValue(newValue);
  };

  const dropDownChangeHandler = (event) => {
    setSelectedLanguage(event.target.value);
    
    // set the output filename and ext based on the language chosen 
    switch (event.target.value) {
      case 'c':
        setFileName(event.target.value + "-output.c");
        break;
      case 'java':
        setFileName(event.target.value + "Output.java");
        break;
      case 'nodejs':
        setFileName(event.target.value + "-output.js");
        break;
      case 'python3':
        setFileName(event.target.value + "-output.py");
        break;
      case 'octave':
        setFileName(event.target.value + "-output.m");
        break;
      case 'cpp':
        setFileName(event.target.value + "-output.cpp");
        break;
      case 'php':
        setFileName(event.target.value + "-output.php");
        break;
      default:
        console.log("Please select a valid language");
    }
  }

  const submitHandler = () => {
    const codeData = {
      run_spec: {
        language_id: selectedLanguage,
        sourcefilename: fileName,
        sourcecode: value,
      },
    };
    submitCode(codeData);
  };

  const submitCode = async (code) => {
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
    }

    const output = await textResponse.json();
    console.log(output);
    setOutput(output.stdout);
  };

  return (
    <>
      <div>
        <select value={selectedLanguage} default={selectedLanguage} onChange={dropDownChangeHandler}>
            <option value='c'>C</option>
            <option value='java'>Java</option>
            <option value='nodejs'>NodeJS</option>
            <option value='python3'>Python</option>
            <option value='octave'>Octave</option>
            <option value='cpp'>C++</option>
            <option value='pascal'>Pascal</option>
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
      <div>
        <button onClick={submitHandler}>Run</button>
      </div>
      <div>
          <h3>Output: </h3>
          <p>{output}</p>
      </div>
    </>
  );
}

export default CodeEditor;
