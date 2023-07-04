import { useState, useRef } from "react";

function MultipleFilesInput() {
    const [fileCount, setFileCount] = useState(0);
  const fileInputRef = useRef(null);
  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files;
    setFileCount(file.length);
    console.log(file);
  };

  return (
    <div className="p-2 flex flex-col w-full h-full">
      <div className="h-12">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileInputChange}
          multiple
        />
        <button className="btn" onClick={handleUploadButtonClick}>
          Upload
        </button>
      </div>
      <span>已选择{fileCount}个文件</span>
    </div>
  );
}

export default MultipleFilesInput;
