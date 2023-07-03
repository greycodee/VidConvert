import { useState, useEffect } from "react";
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import Sidebar from "./components/Sidebar";
import TopBarMenu from "./components/TopBarMenu";
import { Outlet } from "react-router-dom";

const ffmpeg = createFFmpeg({ log: true });

function App() {

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (crossOriginIsolated) {
      if (!ffmpeg.isLoaded()) {
        ffmpeg.load();
        console.log("ffmpeg.wasm has been loaded");
      }
    }else{
      console.log("not crossOriginIsolated");
    }
  }, []);

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
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="bg-slate-200 w-screen h-screen flex flwx-row pt-14 sm:pt-0">
      <Sidebar
        className="hidden sm:block"
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        itemData={itemData}
      />

      <TopBarMenu
        className="sm:hidden"
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        menuData={itemData}
      />

      <Outlet context={[ffmpeg]}/>
    </div>
  );
}

export default App;
