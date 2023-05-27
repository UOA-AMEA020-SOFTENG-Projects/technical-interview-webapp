import { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";

function CodeEditor() {
  const [value, setValue] = useState("");
  const [output, setOutput] = useState("");

  const userInputHandler = (newValue) => {
    setValue(newValue);
  };

  const submitHandler = () => {
    const codeData = {
      run_spec: {
        language_id: "python3",
        sourcefilename: "HelloWorld.py",
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
      throw json(
        {
          message:
            "Could not successfully run code.",
        },
        { status: 500 }
      );
    }

    const output = await textResponse.json();
    console.log(output);
    setOutput(output.stdout);
  };

  return (
    <>
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
