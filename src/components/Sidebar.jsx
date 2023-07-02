import { Link } from "react-router-dom";

function Sidebar({ isOpen, toggleSidebar, itemData }) {
  return (
    <div>
      <div
        className="fixed top-0 left-0 h-full w-full bg-black opacity-50 z-10"
        onClick={toggleSidebar}
        style={{ display: isOpen ? "block" : "none" }}
      ></div>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-20 transition-transform duration-500 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
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
