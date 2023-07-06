import { BiMenu } from "react-icons/bi";

function Header({ className ,toggleSidebar,isOpen}) {
  return (
    <div className={`h-12 ${className} text-gray-900`}>
      <div
        style={{
          height: "inherit",
        }}
        className={`bg-white w-full shadow-md fixed flex flex-row justify-between items-center px-4`}
      >
        <span>
            <BiMenu 
            onClick={toggleSidebar} 
            className={`
            w-6 h-6 origin-center 
            ${isOpen ? "rotate-90":"rotate-0"}
            transition-all duration-500 ease-in-out
            `} 
            />
        </span>
        
      </div>
      <div className="h-full"></div>
    </div>
  );
}

export default Header;
