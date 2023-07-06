function Dashboard(){
    const list = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n"];
    return(
        <div>
            <h1>Dashboard</h1>
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