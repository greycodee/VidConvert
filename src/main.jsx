import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import M3U8ToMP4 from "./pages/M3U8ToMP4.jsx";
import WaterMark from "./pages/WaterMark.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./index.css";
import { BrowserRouter, useRoutes } from "react-router-dom";


const routeData = [
  {
    path: "/",
    element: <App />,
    children: [
      { 
        path: "/dashboard", 
        element: <Dashboard />,

      },
      { 
        path: "/m3u8tomp4", 
        element: <M3U8ToMP4 />
      }
      ,
      { 
        path: "/watermark", 
        element: <WaterMark />
      }
    ]
  }

]

const Routes = () =>{
  let r = useRoutes(routeData);
  return r;
}


ReactDOM.createRoot(
  document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/VidConvert">
      <Routes />
    </BrowserRouter>
    {/* <App /> */}
  </React.StrictMode>
);
