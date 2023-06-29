function WaterMark() {
  return (
    <div className="flex bg-slate-300 h-screen">
      <div className="h-screen w-screen sm:w-3/5 sm:h-5/6 sm:m-auto bg-white rounded-md p-5 flex flex-col">
        <h1 className="text-center font-bold">Add watermark</h1>
        <div className="mt-2">
          <label
            htmlFor="videoFile"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Choose the Video file:
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="file"
              name="videoFile"
              id="videoFile"
              className="block 
            w-full 
            rounded-md 
            border-0 
            text-gray-900 
            ring-1 
            ring-inset 
            ring-gray-300 
            placeholder:text-gray-400 
            focus:ring-2 focus:ring-inset
            sm:text-sm sm:leading-6
            file:border-none
            file:w-32 file:h-10 file:bg-sky-400 file:text-white
            "
            />
          </div>
        </div>
        <div className="mt-2">
          <label
            htmlFor="watermarkFile"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Choose the watermark file:
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="file"
              name="watermarkFile"
              id="watermarkFile"
              className="block 
            w-full 
            rounded-md 
            border-0 
            text-gray-900 
            ring-1 
            ring-inset 
            ring-gray-300 
            placeholder:text-gray-400 
            focus:ring-2 focus:ring-inset
            sm:text-sm sm:leading-6
            file:border-none
            file:w-32 file:h-10 file:bg-sky-400 file:text-white
            "
            />
          </div>
        </div>
        <div className="mt-2">
          <label
            htmlFor="watermarkFile"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Set watermark position:
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              name="watermarkFile"
              id="watermarkFile"
              className="block 
            p-2
            w-full
            h-10
            rounded-md 
            border-0 
            text-gray-900 
            ring-1 
            ring-inset 
            ring-gray-300 
            placeholder:text-gray-400 
            focus:ring-2 focus:ring-inset
            sm:text-sm sm:leading-6
            "
            />
          </div>
        </div>
        <div className="flex-row center text-center mt-2 mb-2">
          <button className="bg-sky-400 m-1 text-white rounded-md w-24 h-10 text-sm disabled:bg-sky-200 hover:bg-sky-500">
            Convert
          </button>
          <button className="bg-sky-400 m-1 text-white rounded-md w-24 h-10 text-sm disabled:bg-sky-200 hover:bg-sky-500">
            Download
          </button>
        </div>
        <pre className="overflow-auto basis-full bg-black text-white rounded-sm text-xs p-2">
          ffmpeg -hide_banner -i VID_20230626_095923.mp4 -i kbs-logo.svg
          -filter_complex "[1:v] scale=176:40
          [logo];[0:v][logo]overlay=x=W-w:y=10" out.mp4"
          <br></br>
          ffmpeg -i .\first.jpg -i .\22.png -filter_complex "[1:v] scale=200:200 [logo];[0:v] [logo]overlay=x=W-w:y=10" out1.jpg
        </pre>
      </div>
    </div>
  );
}

export default WaterMark;
