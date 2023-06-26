import { useState, useEffect, useRef } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

import { parseM3u8File } from './util/M3u8Utils';

import './App.css'

const ffmpeg = createFFmpeg({ log: true });

function App() {
  const [m3u8File, setM3u8File] = useState(null);
  const [tsFiles, setTsFiles] = useState([]);
  const [convertedFile, setConvertedFile] = useState(null);

  const [convertBtnDisEnable, setConvertDisBtnEnable] = useState(false);
  // const [stopBtnDisEnable, setStopBtnDisEnable] = useState(true);
  const [downLoadBtnDisEnable, setDownLoadBtnDisEnable] = useState(true);

  const [log, setLog] = useState('');
  const logRef = useRef(null);

  useEffect(() => {
    const loadFFmpeg = async () => {
      console.log(crossOriginIsolated);
      if (crossOriginIsolated) {
        await ffmpeg.load();   // Post SharedArrayBuffer
        console.log('ffmpeg.wasm has been loaded')
      } else {
        alert("not support your browser version!")
      }
      //await ffmpeg.load();
      // `ffmpeg.wasm` 文件已经加载完成，可以在这里使用 `ffmpeg`
      //console.log('ffmpeg.wasm has been loaded')
    };
    loadFFmpeg();
  }, []);

  useEffect(() => {
    // Set the log element to the ref
    logRef.current = document.getElementById('log');
  }, []);

  const convertFile = async () => {
    try {
      if (m3u8File === null || tsFiles.length === 0) {
        alert("please select m3u8 file and ts files!");
        return;
      }
      setLog((prevLog) => prevLog + "[info] read the input files...\n");
      setConvertDisBtnEnable(true);

      // setStopBtnDisEnable(false);
      let keyFileFlag = false;
      // Load FFmpeg
      // await ffmpeg.load();

      // Read the input m3u8 file
      const m3u8Data = await fetchFile(m3u8File);
      const m3u8String = new TextDecoder('utf-8').decode(m3u8Data); // 将 m3u8Data 转换为字符串类型
      const updatedM3u8Data = parseM3u8File(m3u8String);
      ffmpeg.FS('writeFile', 'input.m3u8', updatedM3u8Data);

      // Read the input ts files
      for (let i = 0; i < tsFiles.length; i++) {
        const fileName = tsFiles[i].name;
        const tsData = await fetchFile(tsFiles[i]);
        if (fileName.includes('key')) {
          keyFileFlag = true;
          console.log("keyFileFlag1:" + keyFileFlag);
          ffmpeg.FS('writeFile', `key`, tsData);
        } else {
          ffmpeg.FS('writeFile', `input${i}.ts`, tsData);
        }

      }

      // Set the log callback
      ffmpeg.setLogger(({ type, message }) => {
        setLog((prevLog) => prevLog + `[${type}] ${message}\n`);
        logRef.current.scrollTop = logRef.current.scrollHeight;
      });


      // Run FFmpeg to convert the files
      await ffmpeg.run('-allowed_extensions', 'ALL', '-i', 'input.m3u8', '-c', 'copy', 'output.mp4');

      // Read the output file
      const outputData = ffmpeg.FS('readFile', 'output.mp4');
      const outputBlob = new Blob([outputData.buffer], { type: 'video/mp4' });

      // Set the converted file for download
      setConvertedFile(outputBlob);
      setDownLoadBtnDisEnable(false);

      // Cleanup
      ffmpeg.FS('unlink', 'input.m3u8');
      let tsFilesSize = tsFiles.length;
      console.log("keyFileFlag2:" + keyFileFlag);
      if (keyFileFlag) {
        tsFilesSize = tsFilesSize - 1;
        ffmpeg.FS('unlink', 'key');
      }
      for (let i = 0; i < tsFilesSize; i++) {
        ffmpeg.FS('unlink', `input${i}.ts`);
      }
      ffmpeg.FS('unlink', 'output.mp4');
      alert("convert done!")
    } catch (error) {
      setDownLoadBtnDisEnable(true);
    }finally{
      // setStopBtnDisEnable(true);
      // setConvertDisBtnEnable(false);
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
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.mp4';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className='m3u8ConvertBox'>
      <div className='title'>m3u8 TO mp4</div>
      <div className='m3u8File'>
        <label htmlFor="m3u8File">Select m3u8 file:</label>
        <input type="file" id="m3u8File" accept=".m3u8" onChange={handleM3u8FileChange} />
      </div>
      <div className='tsFiles'>
        <label htmlFor="tsFiles">Select ts and key files:</label>
        <input type="file" id="tsFiles" onChange={handleTsFilesChange} multiple />
        {/* <ul>
          {tsFiles.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul> */}
      </div>

      <div className='btn'>
        <button onClick={convertFile} disabled={convertBtnDisEnable}>Convert</button>
        {/* <button onClick={stopConvert} disabled={stopBtnDisEnable}>Stop</button> */}
        <button onClick={handleDownload} disabled={downLoadBtnDisEnable}>Download</button>
      </div>
      <div className='logBox'>
        <pre id="log" style={{ backgroundColor: 'black', color: 'white', height: '500px', width: '100%', overflow: 'auto' }}>
          {log}
        </pre>
      </div>
    </div>
  );
}

export default App;
