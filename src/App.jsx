import { useState, useEffect, useRef } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

import './App.css'

const ffmpeg = createFFmpeg({ log: true });

function App() {
  const [m3u8File, setM3u8File] = useState(null);
  const [tsFiles, setTsFiles] = useState([]);
  const [convertedFile, setConvertedFile] = useState(null);

  const [log, setLog] = useState('');
  const logRef = useRef(null);

  useEffect(() => {
    // Set the log element to the ref
    logRef.current = document.getElementById('log');
  }, []);

  const convertFile = async () => {
    // Load FFmpeg
    await ffmpeg.load();

    // Read the input m3u8 file
    const m3u8Data = await fetchFile(m3u8File);
    const m3u8String = new TextDecoder('utf-8').decode(m3u8Data); // 将 m3u8Data 转换为字符串类型
    console.log(m3u8String);
    var tsCount = -1;
    const updatedM3u8Data = m3u8String.replace(/(.*\.ts)/g, () => {
      tsCount++;
      return `input${tsCount}.ts`;
    });
    console.log(updatedM3u8Data);
    ffmpeg.FS('writeFile', 'input.m3u8', updatedM3u8Data);

    // Read the input ts files
    for (let i = 0; i < tsFiles.length; i++) {
      const tsData = await fetchFile(tsFiles[i]);
      ffmpeg.FS('writeFile', `input${i}.ts`, tsData);
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

    // Cleanup
    ffmpeg.FS('unlink', 'input.m3u8');
    for (let i = 0; i < tsFiles.length; i++) {
      ffmpeg.FS('unlink', `input${i}.ts`);
    }
    ffmpeg.FS('unlink', 'output.mp4');
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
    <>
      <div className='m3u8File'>
        <label htmlFor="m3u8File">Select m3u8 file:</label>
        <input type="file" id="m3u8File" accept=".m3u8" onChange={handleM3u8FileChange} />
      </div>
      <div className='tsFiles'>
        <label htmlFor="tsFiles">Select ts files:</label>
        <input type="file" id="tsFiles" accept=".ts" onChange={handleTsFilesChange} multiple />
        <ul>
          {tsFiles.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
      <button onClick={convertFile}>Convert</button>
      {convertedFile && <button onClick={handleDownload}>Download</button>}
      <pre id="log" style={{ backgroundColor: 'black', color: 'white', height: '200px', width:'500px', overflow: 'auto' }}>
        {log}
      </pre>
    </>
  );
}

export default App;