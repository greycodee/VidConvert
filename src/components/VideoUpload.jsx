import { BsCameraVideo } from "react-icons/bs";
import { useRef } from "react";
import PropTypes from "prop-types";

VideoUpload.propTypes = {
    onChange: PropTypes.func.isRequired,
    file: PropTypes.object,
  };

function VideoUpload(props) {
    
    const { onChange, file } = props;
  const inputRef = useRef(null);

  function onClick() {
    inputRef.current.click();
  }

  return (
    <div
      className={`h-full w-full 
        border-dashed border-2 
        ${file === null ? "" : "border-none"}
        border-gray-500 text-gray-500
        hover:border-sky-400 hover:text-sky-400 text-sm font-sans font-light
        flex flex-col items-center justify-center 
        `}
      onClick={onClick}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="video/*"
        onChange={onChange}
      />
      <div
        className={`${
          file === null ? "" : "hidden"
        } w-full h-full flex flex-col items-center justify-center`}
      >
        <BsCameraVideo className="w-1/5 h-1/5 stroke-0" />
        <p className="text-center">Click to upload or drag and drop</p>
      </div>

      <video
        controls
        className={`${file === null ? "hidden" : ""} w-full h-full`}
        src={file === null ? "" : URL.createObjectURL(file)}
      />
    </div>
  );
}

export default VideoUpload;