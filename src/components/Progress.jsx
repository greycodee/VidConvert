import PropType from "prop-types";

Progress.propTypes = {
  className: PropType.string,
  progress: PropType.number.isRequired,
};

function Progress(props) {
  const { progress = 20 } = props;
  return (
    <div className="relative flex h-2 w-full overflow-hidden rounded-full bg-sky-100">
      <div
        style={{width: `${progress}%`}}
        className="flex h-full bg-sky-300"
      ></div>
    </div>
  );
}

export default Progress;
