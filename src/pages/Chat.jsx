import { useState, useRef, useEffect } from "react";
function Chat() {
  const ulRef = useRef(null);
  const liEndRef = useRef(null);
  const [messages, setMessages] = useState([]);

  const addMessage = (position) => {
    const newMessage = {
      id: messages.length,
      name: "name",
      message: "messageasdmessageasdmessageasdmessageasdmessageasdmessageasdmessageasd" + messages.length,
      position: position,
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
      <button className="btn" onClick={() => addMessage("ltr")}>
        add left{" "}
      </button>
      <button className="btn" onClick={() => addMessage("rtl")}>
        add right
      </button>
      <div
        style={{
          backgroundColor: "#ededed", 
        }}
        className="bg-slate-300 w-72 h-128 overflow-y-auto"
      >
        <ul ref={ulRef} className="w-full">
          {messages.map((message) => (
            <li key={message.id} className={` w-full `}>
              <div
                className={`flex ${
                  message.position === "ltr" ? "flex-row" : "flex-row-reverse"
                } mt-2 gap-2`}
              >
                <span className="bg-white rounded-md w-10 h-10"></span>

                <div
                  style={{
                    maxWidth: "50%",
                  }}
                  className={`flex flex-col flex-1
                ${message.position === "ltr" ? "justify-start" : "justify-end"}
                `}
                >

                  
                <div className={`w-full flex
                ${message.position === "ltr" ? "justify-start" : "justify-end"}
                `}>
                <div
                    style={{
                      backgroundColor: "#95EC69",
                    }}
                    className={`text-xs w-max max-w-full break-words rounded-md p-2 
                    `}
                  >
                    {message.message}
                  </div>
                </div>
                  
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
