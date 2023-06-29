// import M3U8TappoMP4 from "./pages/M3U8ToMP4";
import { Link } from "react-router-dom";

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
      content: "content123",
      link: "/23",
    },
  ];
  return (
    <div className="bg-slate-200 w-full h-screen p-2">
      <ul className="bg-slate-50 flex flex-wrap">
        {itemData.map((item) => (
          <li
            key={item.key}
            className="bg-sky-500 text-white p-2 m-2 rounded-md w-full sm:w-40 h-20 shadow-md 
            hover:bg-sky-400 hover:shadow-lg"
          >
            <Link key={item.key} to={item.link}>
              {/* <img src={item.icon} alt={item.title} /> */}
              <div>
                <div className="text-sm">{item.title}</div>
                <p className="text-xs">{item.content}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
