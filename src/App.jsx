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
      content: "watermark",
      link: "/watermark",
    },
    {
      key: 3,
      icon: "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
      title: "Add fakedata3",
      content: "fakedata",
      link: "/fakedata",
    },
    {
      key: 4,
      icon: "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
      title: "Add fakedata4",
      content: "fakedata",
      link: "/fakedata",
    },
    {
      key: 5,
      icon: "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
      title: "Add fakedata5",
      content: "fakedata",
      link: "/fakedata",
    },
  ];
  return (
    <div className="bg-slate-200 w-screen h-screen flex">
      <div className="bg-slate-50 h-screen w-screen sm:w-max sm:h-max sm:m-auto rounded-lg p-2 min-w-max">
        <h1 className="text-center text-lg p-5">Video Convert Tool</h1>
        <ul className=" grid grid-cols-1 sm:grid-cols-4 gap-4">
          {itemData.map((item) => (
            <li
              key={item.key}
              className="bg-sky-500 text-white p-2 rounded-md w-full sm:w-40 h-20 shadow-md 
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
    </div>
  );
}

export default App;
