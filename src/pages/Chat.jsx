import { useState, useRef, useEffect } from "react";
function Chat(){
    const ulRef = useRef(null);
    const liEndRef = useRef(null);
    const [messages, setMessages] = useState([]);

    const addMessage = () => {
        const newMessage = {
            id: messages.length,
            name: "name",
            message: "message"+messages.length
        };
        setMessages([...messages, newMessage]);
        // ulRef.current.scrollTop  = ulRef.current.scrollHeight;
    };

    useEffect(() => {
        liEndRef.current.scrollIntoView({ behavior: "smooth" });
        // ulRef.current.scrollTop = ulRef.current.scrollHeight;
        // console.log("ulRef.current.scrollTop:"+ulRef.current.scrollTop);
        // console.log("ulRef.current.scrollHeight:"+ulRef.current.scrollHeight);
      }, [messages]);

    return (
        <div>
            <h1>Chat</h1>
            <button className="btn" onClick={addMessage}>add </button>
            <div className="bg-slate-300 w-72 h-96 overflow-auto">
                <ul ref={ulRef}>
                    {messages.map((message) => (
                        <li key={message.id}>
                            <div className="flex flex-row">
                                <div className="flex flex-col">
                                    <p className="text-xs">{message.name}</p>
                                    <p className="text-xs">{message.message}</p>
                                </div>
                            </div>
                        </li>
                    ))}

                    {/* 保持自动滚动底部关键行 */}
                    <li ref={liEndRef}></li>
                </ul>

            </div>
        </div>

    );
}

export default Chat;