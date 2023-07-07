import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRef } from "react";

function Dashboard(){
    const [ffmpeg] = useOutletContext();
    const [log, setLog] = useState("");
    const logRef = useRef(null);

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
            <button className="btn" onClick={onClick}>test</button>
            <pre ref={logRef} className="w-96 h-96 bg-black rounded-md overflow-auto text-white text-xs">{log}</pre>
        </div>
    );
}
export default Dashboard;   