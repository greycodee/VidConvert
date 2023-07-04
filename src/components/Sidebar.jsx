import React from "react";
import { useNavigate } from "react-router-dom";

import { BiMenu } from "react-icons/bi";

function Sidebar({ className, isOpen, toggleSidebar, itemData }) {
  const iconStyle = {
    width: "24px",
    height: "24px",
  };
  const mergedIcon = (itemIcon) => {
    return React.cloneElement(itemIcon, {
      style: { ...itemIcon.props.style, ...iconStyle },
    });
  };

  const [selectItem, setSelectItem] = React.useState(0);
  const navigate = useNavigate();

  return (
    <div
      className={`h-full px-2 text-white shadow-xl
      ${isOpen ? "w-36" : "w-12"} 
        bg-slate-800 transition-all duration-500 ease-in-out
    ${className} `}
    >
      
        <div className="w-full h-10 bg-red-700 flex flex-row items-center">
          <BiMenu onClick={toggleSidebar} className="w-6 h-6 float-right" />
        </div>
      
        <ul className="mt-4 flex flex-col justify-center items-center">
          {itemData.map((item) => (
            <li
              key={item.key}
              onClick={() => {
                setSelectItem(item.key);
                navigate(item.link);
              }}
              className={`px-2 py-2 mt-1 
                w-full h-8 rounded-xl flex flex-row
                ${selectItem === item.key ? "bg-white text-slate-800" : " hover:bg-white hover:text-slate-800 cursor-pointer"}
                `}
            >
              
                <i className="w-4 h-4 flex items-center justify-center">
                  {mergedIcon(item.icon)}
                </i>
                
                <span
                style={{
                  transition: "width 0.5s ease-in-out",
                  lineHeight: "16px",
                }}
                  className={`
                    ${isOpen ? "w-full" : "w-0"}
                    text-xs whitespace-nowrap ml-2
                    overflow-hidden
                    `}
                >
                  {item.title }
                </span>

            </li>
          ))}
        </ul>
    </div>
  );
}

export default Sidebar;
