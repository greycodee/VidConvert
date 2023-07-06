import { useOutletContext } from "react-router-dom";

function Dashboard(){
    const [ffmpeg] = useOutletContext();

    const list = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n"];
    const onClick = () => {
        ffmpeg.run("-version");
    }
    return(
        <div>
            <h1>Dashboard</h1>
            <button className="btn" onClick={onClick}>test</button>
            <ul>
                {list.map((item,index)=>{
                    return(
                        <li key={index} className="w-10 h-96 bg-sky-200">{item}</li>
                    )
                })}
            </ul>
        </div>
    );
}
export default Dashboard;   