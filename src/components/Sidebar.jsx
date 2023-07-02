import { Link } from "react-router-dom";

function Sidebar({className, isOpen, toggleSidebar, itemData }) {
  return (
    <div className={`h-full ${isOpen ? "w-48":"w-20"} bg-sky-200 transition-all duration-500 ease-in-out
    ${className} `}
    // style={{ display: isOpen ? "block" : "none" }}
    >
      {/* <div
        className="fixed top-0 left-0 h-full w-full bg-black opacity-50 z-20"
        onClick={toggleSidebar}
        style={{ display: isOpen ? "block" : "none" }}
      ></div> */}
      <div>
        <button onClick={
          toggleSidebar
        }>close</button>
        <nav className="mt-8">
          <ul>
            {itemData.map((item) => (
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
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
