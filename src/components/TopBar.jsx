/* eslint-disable react/prop-types */
function TopBar({ className, isOpen, toggleSidebar }) {
  return (
    <div className={`${className} z-40 fixed top-0 left-0 right-0`}>
      <div className={` bg-gray-800 text-gray-100 py-4 px-8 flex justify-between items-center`}>
        <button
          className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
          onClick={toggleSidebar}
        >
          {isOpen ? (
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
          ) : (
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
        <div>VidConvert</div>
      </div>
    </div>
  );
}

export default TopBar;
