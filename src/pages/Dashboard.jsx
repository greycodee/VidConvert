import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRef } from "react";

import Progress from "../components/Progress";
import ImageUpload from "../components/ImageUpload";
import VideoUpload from "../components/VideoUpload";

function Dashboard(){
    const [ffmpeg] = useOutletContext();
    const [log, setLog] = useState("");
    const logRef = useRef(null);

    const [img, setImg] = useState(null);

    const handlerUploadImage = (event) => {
        const file = event.target.files[0];
        setImg(file);
    }

    // const list = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n"];
    const onClick = () => {
        ffmpeg.run("-version");
    }
    useEffect(() => {
        ffmpeg.setLogger(({ type, message }) => {
          setLog((prevLog) => prevLog + `[${type}] ${message}\n`);
          logRef.current.scrollTop = logRef.current.scrollHeight;
        });
      }, []);

    return(
        <div>
            <h1>Dashboard</h1>
            <div className="w-96">
                <Progress progress={200}/>
            </div>
            {/* <div className="w-96 h-96 mt-8">
                <ImageUpload file={img} onChange={handlerUploadImage}/>
            </div> */}
            <div className="w-96 h-96 mt-8">
                <VideoUpload file={img} onChange={handlerUploadImage}/>
            </div>
            <button className="btn" onClick={onClick}>test</button>
            <pre ref={logRef} className="w-96 h-96 bg-black rounded-md overflow-auto text-white text-xs">{log}</pre>
        </div>
    );
}
export default Dashboard;   