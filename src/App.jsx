// import M3U8TappoMP4 from "./pages/M3U8ToMP4";
import { Link } from 'react-router-dom';

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
    <div className="bg-slate-200 w-full h-screen">
      <ul className="bg-slate-50 flex flex-row">
        {itemData.map((item) => (
          <Link key={item.key} to={item.link}>
            <li key={item.key} className="bg-black text-cyan-100 p-2 m-2">
              {item.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default App;
