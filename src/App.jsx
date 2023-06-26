import { useState, useEffect, useRef } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { parseM3u8File } from './util/M3u8Utils';

const ffmpeg = createFFmpeg({ log: true });

function App() {

  const { enqueueSnackbar } = useSnackbar();
  const [m3u8File, setM3u8File] = useState(null);
  const [tsFiles, setTsFiles] = useState([]);
  const [convertedFile, setConvertedFile] = useState(null);
  const [convertBtnDisEnable, setConvertDisBtnEnable] = useState(false);
  const [downLoadBtnDisEnable, setDownLoadBtnDisEnable] = useState(true);
  const [log, setLog] = useState('');
  const logRef = useRef(null);

  useEffect(() => {
    const loadFFmpeg = async () => {
      await ffmpeg.load();
      console.log('ffmpeg.wasm has been loaded')
    }
    // eslint-disable-next-line no-undef
    if (crossOriginIsolated) {
      loadFFmpeg();
    } else {
      enqueueSnackbar("Not support your browser version!", { "variant": "error" })
    }
  }, []);

  useEffect(() => {
    // Set the log element to the ref
    logRef.current = document.getElementById('log');
  }, []);

  const convertFile = async () => {
    try {
      // eslint-disable-next-line no-undef
      if (!crossOriginIsolated) {
        enqueueSnackbar("Not support your browser version!", { "variant": "error" })
        return;
      }
      if (m3u8File === null || tsFiles.length === 0) {
        enqueueSnackbar("please select the input files!", { "variant": "warning" })
        return;
      }
      setLog((prevLog) => prevLog + "[info] read the input files...\n");
      setConvertDisBtnEnable(true);
      let keyFileFlag = false;

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
      enqueueSnackbar("Convert Done!", { "variant": "success" })
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
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.mp4';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (

    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid item xs={12} sm={8} md={6}>
        <Box>
          <Typography variant="h3">
            m3u8 TO mp4
          </Typography>
          <Box className='m3u8File'>
            <input type='file' accept=".m3u8" onChange={handleM3u8FileChange} />
          </Box>
          <Box className='tsFiles'>
            <input type='file' onChange={handleTsFilesChange} multiple />
          </Box>

          <Box className='btn'>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button variant="contained" onClick={convertFile} disabled={convertBtnDisEnable}>Convert</Button>
              <Button variant="contained" onClick={handleDownload} disabled={downLoadBtnDisEnable}>Download</Button>

            </ButtonGroup>
          </Box>
          <Box className='logBox'>
            <pre id="log" style={{ backgroundColor: 'black', color: 'white', height: '500px', width: '100%', overflow: 'auto' }}>
              {log}
            </pre>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default App;
