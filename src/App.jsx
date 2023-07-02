// import M3U8TappoMP4 from "./pages/M3U8ToMP4";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
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

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="bg-slate-200 w-screen h-screen flex pt-14">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} itemData={itemData}/>
      <TopBar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="h-screen w-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
