import React from "react";
import { Link } from "react-router-dom";

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

  return (
    <div
      className={`h-full px-2
      ${isOpen ? "w-48" : "w-16"} 
        bg-slate-800 transition-all duration-500 ease-in-out
    ${className} `}
    >
      <div>
        <div className="w-full h-12 bg-red-700">
          <BiMenu onClick={toggleSidebar} className="text-white w-6 h-6 float-right" />
        </div>
        
        {/* <nav className="mt-8 ring-1 ring-red-500"> */}
        <ul className="mt-4 flex flex-col justify-center items-center">
          {itemData.map((item) => (
            <li
              key={item.key}
              onClick={() => setSelectItem(item.key)}
              className={`px-2 py-2 mt-1 text-white
                 hover:bg-white hover:text-slate-800 cursor-pointer
                w-full h-10 rounded-xl flex flex-row items-center
                ${selectItem === item.key ? "bg-white text-slate-800" : ""}
                `}
            >
              <Link className="flex" key={item.key} to={item.link}>
                <i className="w-8 h-8 flex items-center justify-center">
                  {mergedIcon(item.icon)}
                </i>

                <span
                  className={`
                    ${isOpen ? "opacity-100" : "opacity-0"}
                    ml-2 text-sm whitespace-nowrap 
                    flex items-center
                    `}
                >
                  {item.title}
                </span>
                {/* </div> */}
              </Link>
            </li>
          ))}
        </ul>
        {/* </nav> */}
      </div>
    </div>
  );
}

export default Sidebar;
