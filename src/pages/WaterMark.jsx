import { useState, useEffect, useRef } from "react";
import { fetchFile } from "@ffmpeg/ffmpeg";
import { useOutletContext } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";
import VideoUpload from "../components/VideoUpload";
import Image from "../components/Image";


function WaterMark() {
  const [ffmpeg] = useOutletContext();
  const [videoFile, setVideoFile] = useState(null);
  const [videoName, setVideoName] = useState("");
  const [watermarkFile, setWatermarkFile] = useState(null);
  const [watermarkName, setWatermarkName] = useState("");
  const [viderFirstFrame, setVideoFirstFrame] = useState(null);
  const [previewImage,setPreviewImage] = useState(null);



  const [log, setLog] = useState("");
  const logRef = useRef(null);

  useEffect(() => {

    ffmpeg.setLogger(({ type, message }) => {
      setLog((prevLog) => prevLog + `[${type}] ${message}\n`);
      logRef.current.scrollTop = logRef.current.scrollHeight;
    });

  }, []);

  async function videoFileChangeHandler(event) {
    console.log(event.target.files[0].name);
    setVideoFile(event.target.files[0]);
    setVideoName(event.target.files[0].name);
    const videoData = await fetchFile(event.target.files[0]);
    ffmpeg.FS("writeFile", event.target.files[0].name, videoData);
    await ffmpeg.run("-i", event.target.files[0].name,"-vframes","1",event.target.files[0].name+".jpg");
    const firstFeameData = ffmpeg.FS("readFile", event.target.files[0].name+".jpg");
    const firstFeameBlob = new Blob([firstFeameData.buffer], { type: "image/jpg" });
    setVideoFirstFrame(firstFeameBlob);
  }

  async function convertHandler() {
    console.log("videoName:" + videoName);
    await ffmpeg.run("-i", videoName);
  }

  async function watermarkFileChangeHandler(event) {
    console.log(event.target.files[0].name);
    setWatermarkFile(event.target.files[0]);
    setWatermarkName(event.target.files[0].name);
    const watermarkData = await fetchFile(event.target.files[0]);
    ffmpeg.FS("writeFile", event.target.files[0].name, watermarkData);
  }

  async function watermarkPreviewHandler() {
    console.log("watermarkPreviewHandler");
    await ffmpeg.run("-i", videoName+".jpg", "-i", watermarkName, "-filter_complex", "[1:v] scale=200:200 [logo];[0:v] [logo]overlay=x=W-w:y=10", videoName+watermarkName+".jpg");
    const previewData = ffmpeg.FS("readFile", videoName+watermarkName+".jpg");
    const previewDataBlob = new Blob([previewData.buffer], { type: "image/jpg" });
    setPreviewImage(previewDataBlob);
  }

  return (
      <div className="h-max sm:h-full w-full bg-white rounded-md p-5 ">
        <h1 className="text-center font-bold">Add watermark</h1>
        <div className="h-32 w-32">
          <VideoUpload onChange={videoFileChangeHandler} file={videoFile}/>
        </div>
        
        <div className="h-32 w-32">
          <ImageUpload onChange={watermarkFileChangeHandler} file={watermarkFile}/>
        </div>
        
        <div className="mt-2">
          <label
            htmlFor="watermarkFile"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Set watermark position:
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              name="watermarkFile"
              id="watermarkFile"
              className="block 
            p-2
            w-full
            h-10
            rounded-md 
            border-0 
            text-gray-900 
            ring-1 
            ring-inset 
            ring-gray-300 
            placeholder:text-gray-400 
            focus:ring-2 focus:ring-inset
            sm:text-sm sm:leading-6
            "
            />
          </div>
        </div>

        <div className="mt-2">
          <label
            htmlFor="watermarkPreview"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Watermark Preview:
          </label>
          <button
          id="watermarkPreview"
            onClick={watermarkPreviewHandler}
            className="bg-sky-400 m-1 text-white rounded-md w-24 h-10 text-sm disabled:bg-sky-200 hover:bg-sky-500"
          >
            Preview
          </button>
          <div className="h-32 w-32">
            <Image src={previewImage === null ? "":URL.createObjectURL(previewImage)}/>
          </div>
        </div>

        <div className="flex-row center text-center mt-2 mb-2">
          <button
            onClick={convertHandler}
            className="bg-sky-400 m-1 text-white rounded-md w-24 h-10 text-sm disabled:bg-sky-200 hover:bg-sky-500"
          >
            Convert
          </button>
          <button className="bg-sky-400 m-1 text-white rounded-md w-24 h-10 text-sm disabled:bg-sky-200 hover:bg-sky-500">
            Download
          </button>
        </div>
        <pre
          ref={logRef}
          className="overflow-auto basis-full bg-black text-white rounded-sm text-xs p-2"
        >
          ffmpeg -hide_banner -i VID_20230626_095923.mp4 -i kbs-logo.svg
          -filter_complex "[1:v] scale=176:40
          [logo];[0:v][logo]overlay=x=W-w:y=10" out.mp4"
          <br></br>
          ffmpeg -i .\first.jpg -i .\22.png -filter_complex "[1:v] scale=200:200
          [logo];[0:v] [logo]overlay=x=W-w:y=10" out1.jpg
          {log}
        </pre>
      </div>
  );
}

export default WaterMark;
