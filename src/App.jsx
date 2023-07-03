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

        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20.735a8 8 0 01-8-8H0c0 4.411 3.589 8 8 8v-2.265zm3-5.291a7.962 7.962 0 01-2 5.291v2.265a8 8 0 008-8h-2zM20 12a8 8 0 01-8 8v4c4.411 0 8-3.589 8-8h-4zm-2-5.291a7.962 7.962 0 012-5.291v-2.265a8 8 0 00-8 8h2z"
          />
        </svg>
        <p className="text-white">Loading ffmpeg.wasm...</p>
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
