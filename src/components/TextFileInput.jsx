import { useState,useRef } from "react";

function TextFileInput() {
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
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />
        <button className="btn" onClick={handleUploadButtonClick}>Upload</button>
        
      </div>
      <span>选择的文件：{fileName}</span>
      <pre className="text-white w-full bg-black flex-1 p-2 rounded-md overflow-scroll">
        {textContent}
      </pre>
    </div>
  );
}

export default TextFileInput;
