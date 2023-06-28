import { useState, useEffect, useRef } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { parseM3u8File } from "./util/M3u8Utils";

const ffmpeg = createFFmpeg({ log: true });

function App() {
  const [m3u8File, setM3u8File] = useState(null);
  const [tsFiles, setTsFiles] = useState([]);
  const [convertedFile, setConvertedFile] = useState(null);
  const [convertBtnDisEnable, setConvertDisBtnEnable] = useState(false);
  const [downLoadBtnDisEnable, setDownLoadBtnDisEnable] = useState(true);
  const [log, setLog] = useState("");
  const logRef = useRef(null);

  useEffect(() => {
    const loadFFmpeg = async () => {
      await ffmpeg.load();
      console.log("ffmpeg.wasm has been loaded");
    };
    // eslint-disable-next-line no-undef
    if (crossOriginIsolated) {
      loadFFmpeg();
    }
  }, []);

  const convertFile = async () => {
    try {
      // eslint-disable-next-line no-undef
      if (!crossOriginIsolated) {
        
        return;
      }
      if (m3u8File === null || tsFiles.length === 0) {
        return;
      }
      setLog((prevLog) => prevLog + "[info] read the input files...\n");
      setConvertDisBtnEnable(true);
      let keyFileFlag = false;

      // Read the input m3u8 file
      const m3u8Data = await fetchFile(m3u8File);
      const m3u8String = new TextDecoder("utf-8").decode(m3u8Data); // 将 m3u8Data 转换为字符串类型
      const updatedM3u8Data = parseM3u8File(m3u8String);
      ffmpeg.FS("writeFile", "input.m3u8", updatedM3u8Data);

      // Read the input ts files
      for (let i = 0; i < tsFiles.length; i++) {
        const fileName = tsFiles[i].name;
        const tsData = await fetchFile(tsFiles[i]);
        if (fileName.includes("key")) {
          keyFileFlag = true;
          ffmpeg.FS("writeFile", `key`, tsData);
        } else {
          ffmpeg.FS("writeFile", `input${i}.ts`, tsData);
        }
      }

      // Set the log callback
      ffmpeg.setLogger(({ type, message }) => {
        setLog((prevLog) => prevLog + `[${type}] ${message}\n`);
        logRef.current.scrollTop = logRef.current.scrollHeight;
      });

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
      let tsFilesSize = tsFiles.length;
      console.log("keyFileFlag2:" + keyFileFlag);
      if (keyFileFlag) {
        tsFilesSize = tsFilesSize - 1;
        ffmpeg.FS("unlink", "key");
      }
      for (let i = 0; i < tsFilesSize; i++) {
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
    <div className="flex-col p-5 bg-slate-400 rounded-xl w-128 h-3/4 m-auto">
      <div className="flex items-center space-x-6 border-b-2 border-indigo-100">
        <label className="block">
          <span className="">Choose profile photo</span>
          <input
            type="file"
            onChange={handleM3u8FileChange}
            accept=".m3u8"
            className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-2 file:w-24 file:h-10
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100
          "
          />
        </label>
      </div>
      <div className="flex items-center space-x-6 border-b-2 border-indigo-100">
        <label className="block">
          <span className="">Choose profile photo</span>
          <input
            type="file"
            onChange={handleTsFilesChange}
            multiple
            className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-2 file:w-24 file:h-10
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100
          "
          />
        </label>
      </div>
      <div className="flex-row center text-center">
        <button
          className="bg-slate-900 m-1 text-sky-100 rounded-full w-24 h-10 text-sm"
          onClick={convertFile}
          disabled={convertBtnDisEnable}
        >
          Convert
        </button>
        <button
          className="bg-slate-900 m-1 text-sky-100 rounded-full w-24 h-10 text-sm"
          onClick={handleDownload}
          disabled={downLoadBtnDisEnable}
        >
          Download
        </button>
      </div>
      <div className="w-full">
        <pre
          ref={logRef}
          className="bg-black overflow-auto text-white rounded-sm h-96 w-full"
        >
          {log}
        </pre>
      </div>
    </div>
  );
}

export default App;
