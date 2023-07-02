// import M3U8TappoMP4 from "./pages/M3U8ToMP4";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import TopBarMenu from "./components/TopBarMenu";
import { Outlet } from "react-router-dom";



function App() {

  const itemData = [
    {
      key: 1,
      icon: "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
      title: "M3U8 to MP4",
      content: "content123",
      link: "/m3u8tomp4",
    },
    {
      key: 2,
      icon: "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
      title: "Add watermark",
      content: "watermark",
      link: "/watermark",
    }
  ];

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="bg-slate-200 w-screen h-screen flex flwx-row">
      <Sidebar
      className="hidden sm:block"
      isOpen={isOpen} 
      toggleSidebar={toggleSidebar} 
      itemData={itemData}/>
    
      <TopBarMenu 
      className="sm:hidden" 
      isOpen={isOpen} 
      toggleSidebar={toggleSidebar} 
      menuData={itemData}
      />

      <Outlet />
 
      
    </div>
  );
}

export default App;
