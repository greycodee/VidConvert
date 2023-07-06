/* eslint-disable react/prop-types */
import { useState, useRef } from "react";

function TextFileInput({ onChange }) {
  // const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [textContent, setTextContent] = useState("");

  const fileInputRef = useRef(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    //   setFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setTextContent(event.target.result);
    };
    reader.readAsText(file);
    onChange(file);
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="p-2 flex flex-col w-full h-full">
      <div className="h-12">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileInputChange}
        />
        <button className="btn" onClick={handleUploadButtonClick}>
          Upload
        </button>
      </div>
      <span className="h-6 text-sm text-gray-500">选择的文件：{fileName}</span>
      <pre className="flex-1 text-xs text-white w-full bg-black p-2 rounded-md overflow-auto">
        {textContent}
      </pre>
    </div>
  );
}

export default TextFileInput;
