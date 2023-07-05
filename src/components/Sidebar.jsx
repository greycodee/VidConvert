/* eslint-disable react/prop-types */
import { cloneElement, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ className, isOpen, itemData }) {
  const iconStyle = {
    width: "24px",
    height: "24px",
  };
  const mergedIcon = (itemIcon) => {
    return cloneElement(itemIcon, {
      style: { ...itemIcon.props.style, ...iconStyle },
    });
  };

  const [currRootPath, setCurrRootPath] = useState("");
  const navigate = useNavigate();

  let location = useLocation();

  useEffect(() => {
    setCurrRootPath(location.pathname.split("/")[1]);
  }, [location]);

  console.log();

  return (
    <div
      className={`h-full px-2 text-white shadow-xl pt-12
      ${isOpen ? "w-36" : "w-12"} 
        bg-slate-900 transition-all duration-500 ease-in-out
    ${className} `}
    >
      <ul className="mt-4 flex flex-col justify-center items-center">
        {itemData.map((item) => (
          <li
            key={item.key}
            onClick={() => {
              navigate(item.link);
            }}
            className={`px-2 py-2 mt-1 
                w-full h-8 rounded-xl flex flex-row cursor-pointer
                ${
                  currRootPath === item.link
                    ? "bg-white text-slate-800"
                    : " hover:bg-white hover:text-slate-800"
                }
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
              {item.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
