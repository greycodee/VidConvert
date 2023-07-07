/* eslint-disable no-undef */

import { useState, useEffect } from "react";
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import Sidebar from "./components/Sidebar";
import TopBarMenu from "./components/TopBarMenu";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { DiStackoverflow, DiApple } from "react-icons/di";
import {BsFillChatDotsFill} from "react-icons/bs";
import { MdSpaceDashboard } from "react-icons/md";

const ffmpeg = createFFmpeg({ log: true });

function App() {
  const [ffmpegLoading, setFFmepgLoading] = useState(true);
  // let location = useLocation();
  // console.log(location);

  useEffect(() => {
    if (crossOriginIsolated) {
      if (!ffmpeg.isLoaded()) {
        ffmpeg.load();
        setFFmepgLoading(false);
      }
    } else {
      console.log("not crossOriginIsolated");
    }
  }, []);

  const itemData = [
    {
      key: 1,
      icon: <MdSpaceDashboard />,
      title: "Dashboard",
      content: "dashboard",
      link: "dashboard",
    },
    {
      key: 2,
      icon: <DiStackoverflow />,
      title: "M3U8 to MP4",
      content: "content123",
      link: "m3u8tomp4",
    },
    {
      key: 3,
      icon: <DiApple />,
      title: "Add watermark",
      content: "watermark",
      link: "watermark",
    },
    {
      key: 4,
      icon: <BsFillChatDotsFill />,
      title: "Chat",
      content: "chat",
      link: "chat",
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
        itemData={itemData}
      />

      <TopBarMenu
        className="sm:hidden"
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        menuData={itemData}
      />

      <div className="flex-1 w-0 h-full flex flex-col">
        <Header className="hidden sm:block" 
        toggleSidebar={toggleSidebar} 
        isOpen={isOpen}
        />
        <main className="overflow-auto flex-1 h-0">
          <Outlet context={[ffmpeg]} />
        </main>
      </div>
    </div>
  );
}

export default App;
