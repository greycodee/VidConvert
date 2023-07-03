import { Link } from "react-router-dom";

import m3u8Logo from "../assets/m3u8.svg";

function Sidebar({className, isOpen, toggleSidebar, itemData }) {
  return (
    <div className={`h-full ${isOpen ? "w-48":"w-11"} bg-slate-800 transition-all duration-500 ease-in-out
    ${className} `}
    >
      <div>
        <button onClick={
          toggleSidebar
        }>close</button>
        <nav className="mt-8 ring-1 ring-red-500">
          <ul>
            {itemData.map((item) => (
              <li
                key={item.key}
                onClick={toggleSidebar}
                className="ring-1 px-2 py-2 text-gray-700 hover:bg-gray-100 hover:bg-sky-300 hover:text-white cursor-pointer"
              >
                <Link key={item.key} to={item.link}>
                  <div className="flex flex-row items-center  ring-1 ring-green-800">
                   <img src={m3u8Logo} className="w-6 h-6"/>
                    <span 
                    className={`${isOpen ? "visible":"invisible"} ml-2 text-white text-sm whitespace-nowrap transition-all duration-200 ease-out`}>
                      {item.title}
                      </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
