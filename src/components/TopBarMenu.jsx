import TopBar from "./TopBar";
import { Link } from "react-router-dom";

function TopBarMenu({ className, isOpen, toggleSidebar, menuData }) {

    return (
        <div className={`${className}`}>
            <TopBar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <ul className={`z-30 fixed top-14 left-0 right-0
            ${isOpen ? "translate-y-0" : "-translate-y-full"} 
            bg-sky-100 transition-transform duration-100 ease-in-out`}>
                {menuData.map((item) => (
                    <li
                        key={item.key}
                        onClick={toggleSidebar}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:bg-sky-300 hover:text-white cursor-pointer"
                    >
                        <Link key={item.key} to={item.link}>
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default TopBarMenu;