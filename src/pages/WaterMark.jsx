function WaterMark() {
  return (
    <div className="flex-col">
      视频：
      <input type="file" />
      水印图片：
      <input type="file" />
      水印位置：
      <input placeholder="左上角" />
      <div className="flex-row center text-center mt-2 mb-2">
        <button className="bg-sky-400 m-1 text-white rounded-md w-24 h-10 text-sm disabled:bg-sky-200 hover:bg-sky-500">
          Convert
        </button>
        <button className="bg-sky-400 m-1 text-white rounded-md w-24 h-10 text-sm disabled:bg-sky-200 hover:bg-sky-500">
          Download
        </button>
      </div>
      <pre>
        ffmpeg -hide_banner -i VID_20230626_095923.mp4 -i kbs-logo.svg
        -filter_complex "[1:v] scale=176:40
        [logo];[0:v][logo]overlay=x=W-w:y=10" out.mp4"
      </pre>
    </div>
  );
}

export default WaterMark;
