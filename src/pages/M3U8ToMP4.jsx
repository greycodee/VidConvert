import { useState, useRef, useEffect } from "react";
import { fetchFile } from "@ffmpeg/ffmpeg";
import { parseM3u8File } from "../util/M3u8Utils";
import { useOutletContext } from "react-router-dom";

import TextFileInput from "../components/TextFileInput";
import MultipleFilesInput from "../components/MultipleFilesInput";

function M3U8ToMP4() {
  const [ffmpeg] = useOutletContext();
  const [m3u8File, setM3u8File] = useState(null);
  const [tsFiles, setTsFiles] = useState([]);
  const [convertedFile, setConvertedFile] = useState(null);
  const [convertBtnDisEnable, setConvertDisBtnEnable] = useState(false);
  const [downLoadBtnDisEnable, setDownLoadBtnDisEnable] = useState(true);
  const [log, setLog] = useState("");
  const logRef = useRef(null);

  useEffect(() => {

    ffmpeg.setLogger(({ type, message }) => {
      setLog((prevLog) => prevLog + `[${type}] ${message}\n`);
      logRef.current.scrollTop = logRef.current.scrollHeight;
    });

  }, []);

  const handleM3u8FileUpload = async (file) => {
    const m3u8Data = await fetchFile(file);
    const m3u8String = new TextDecoder("utf-8").decode(m3u8Data); // 将 m3u8Data 转换为字符串类型
    const updatedM3u8Data = parseM3u8File(m3u8String);
    ffmpeg.FS("writeFile", "input.m3u8", updatedM3u8Data);
  };


  const handleTSFileUpload = async (file) => {
    for (let i = 0; i < file.length; i++) {
      console.log("ts file length:" + file.length);
      const fileName = file[i].name;
      const tsData = await fetchFile(file[i]);
      if (fileName.includes("key")) {
        ffmpeg.FS("writeFile", `key`, tsData);
      } else {
        ffmpeg.FS("writeFile", `input${i}.ts`, tsData);
      }
    }
  };

  const convertFile = async () => {
    try {

      setLog((prevLog) => prevLog + "[info] read the input files...\n");
      setConvertDisBtnEnable(true);


      // Read the input ts files
      for (let i = 0; i < tsFiles.length; i++) {
        console.log("ts file length:" + tsFiles.length);
        const fileName = tsFiles[i].name;
        const tsData = await fetchFile(tsFiles[i]);
        if (fileName.includes("key")) {
         
          ffmpeg.FS("writeFile", `key`, tsData);
        } else {
          ffmpeg.FS("writeFile", `input${i}.ts`, tsData);
        }
      }

      // Run FFmpeg to convert the files
      await ffmpeg.run(
        "-allowed_extensions",
        "ALL",
        "-i",
        "input.m3u8",
        "-c",
        "copy",
        "output.mp4"
      );

      // Read the output file
      const outputData = ffmpeg.FS("readFile", "output.mp4");
      const outputBlob = new Blob([outputData.buffer], { type: "video/mp4" });

      // Set the converted file for download
      setConvertedFile(outputBlob);
      setDownLoadBtnDisEnable(false);

      // Cleanup
      ffmpeg.FS("unlink", "input.m3u8");
      for (let i = 0; i < tsFiles.length; i++) {
        ffmpeg.FS("unlink", `input${i}.ts`);
      }
      ffmpeg.FS("unlink", "output.mp4");
    } catch (error) {
      setDownLoadBtnDisEnable(true);
    }
  };

  const handleM3u8FileChange = (event) => {
    setM3u8File(event.target.files[0]);
  };

  const handleTsFilesChange = (event) => {
    setTsFiles(Array.from(event.target.files));
  };

  const handleDownload = () => {
    const url = URL.createObjectURL(convertedFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.mp4";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className=" bg-slate-300 h-full w-full">
      <div className="h-full w-full  bg-white rounded-md p-5 flex flex-col sm:flex-row">
        
        <TextFileInput onChange={handleM3u8FileUpload} />
        <MultipleFilesInput onChange={handleTSFileUpload} />
        <div className="flex-row center text-center mt-2 mb-2">
          <button
            className="bg-sky-400 m-1 text-white rounded-md w-24 h-10 text-sm disabled:bg-sky-200 hover:bg-sky-500"
            onClick={convertFile}
            disabled={convertBtnDisEnable}
          >
            Convert
          </button>
          <button
            className="bg-sky-400 m-1 text-white rounded-md w-24 h-10 text-sm disabled:bg-sky-200 hover:bg-sky-500"
            onClick={handleDownload}
            disabled={downLoadBtnDisEnable}
          >
            Download
          </button>
        </div>
        
          <pre
            ref={logRef}
            className="overflow-auto basis-full min-h-[300px] bg-black text-white rounded-sm text-xs p-2"
          >
            {log}
          </pre>
      
      </div>
    </div>
  );
}

export default M3U8ToMP4;
