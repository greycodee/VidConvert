// import { useState } from 'react';

// function Sidebar() {
//   const [isOpen, setIsOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="fixed top-0 left-0 h-full w-full">
//       <div className="fixed top-0 left-0 h-full w-full bg-black opacity-50 z-10"
//            onClick={toggleSidebar}
//            style={{ display: isOpen ? 'block' : 'none' }}></div>
//       <div className={`fixed top-0 left-0 h-full w-64 bg-white z-20 transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//         <button className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
//                 onClick={toggleSidebar}>
//           <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//         <nav className="mt-8">
//           <ul>
//             <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</li>
//             <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">Projects</li>
//             <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">Team</li>
//             <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</li>
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;

function Sidebar({ isOpen, toggleSidebar }) {
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
        <button
          className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
          onClick={toggleSidebar}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <nav className="mt-8">
          <ul>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">
              Dashboard
            </li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">
              Projects
            </li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">Team</li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">
              Settings
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
