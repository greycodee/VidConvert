import React from "react";
import { Link } from "react-router-dom";

import { BiMenu } from "react-icons/bi";

function Sidebar({ className, isOpen, toggleSidebar, itemData }) {
  const iconStyle = {
    width: "36px",
    height: "36px",
  };
  const mergedIcon = (itemIcon) => {
    return React.cloneElement(itemIcon, {
      style: { ...itemIcon.props.style, ...iconStyle },
    });
  };

  return (
    <div
      className={`h-full ${
        isOpen ? "w-64" : "w-20"
      } bg-slate-800 transition-all duration-500 ease-in-out
    ${className} `}
    >
      <div>
        <div className="w-full h-12 bg-red-700">
          <BiMenu onClick={toggleSidebar} className="text-white w-6 h-6 float-right" />
        </div>
        
        {/* <nav className="mt-8 ring-1 ring-red-500"> */}
        <ul className="mt-16 flex flex-col justify-center items-center">
          {itemData.map((item) => (
            <li
              key={item.key}
              className="px-2 py-2 mt-2 text-white
                 hover:bg-white hover:text-slate-800 cursor-pointer
                w-11/12 h-14 rounded-xl flex flex-row items-center
                "
            >
              <Link className="flex" key={item.key} to={item.link}>
                <i className="w-12 h-12 flex items-center justify-center">
                  {mergedIcon(item.icon)}
                </i>

                <span
                  style={{
                    "transitionProperty": "opacity,visibility",
                    "transitionDuration": "300ms",
                    "transitionTimingFunction": "linear",
                  }}
                  className={`
                    ${isOpen ? "visible" : "invisible"} 
                    ${isOpen ? "opacity-100" : "opacity-0"}
                    ml-2 text-lg whitespace-nowrap 
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
