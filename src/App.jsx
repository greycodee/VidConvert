import { useState, useEffect } from "react";
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import Sidebar from "./components/Sidebar";
import TopBarMenu from "./components/TopBarMenu";
import { Outlet } from "react-router-dom";

const ffmpeg = createFFmpeg({ log: true });

function App() {
  const [ffmpegLoading, setFFmepgLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (crossOriginIsolated) {
      if (!ffmpeg.isLoaded()) {
        ffmpeg.load();
        console.log("ffmpeg.wasm has been loaded");
        setFFmepgLoading(false);
      }
    } else {
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
      <div
        className={`
      ${ffmpegLoading ? "" : "hidden"}
      z-50 h-screen w-screen 
      fixed top-0 left-0 bg-slate-600 
      opacity-70 text-white
      flex justify-center items-center`}
      >
        <p className="text-white">Your browser not support</p>
      </div>
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

      <Outlet context={[ffmpeg]} />
    </div>
  );
}

export default App;
