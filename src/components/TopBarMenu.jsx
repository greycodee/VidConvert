/* eslint-disable react/prop-types */
import {useState} from "react";
import TopBar from "./TopBar";
import { Link } from "react-router-dom";

function TopBarMenu({ className, menuData }) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
      };

    return (
        <div className={`${className}`}>
            <TopBar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <ul className={`z-30 fixed top-14 left-0 right-0 overflow-hidden bg-gray-800
            text-white divide-y
            ${isOpen ? "h-full" : "h-0"}
            transition-all duration-100 ease-in-out`}>
                {menuData.map((item) => (
                    <li
                        key={item.key}
                        onClick={toggleSidebar}
                        className="px-4 py-2"
                    >
                        <Link key={item.key} to={item.link}>
                            <span>
                                {item.title}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default TopBarMenu;