import classNames from "classnames";

function Skeleton({ numberOfBoxes, className }) {
  const outerDiv = classNames(
    "relative",
    "w-full",
    "h-11",
    "bg-gray-200",
    "overflow-hidden",
    "my-2",
    className
  );

  const innerDiv = classNames(
    "animate-shimmer",
    "absolute",
    "inset-0",
    "-translate-x-full",
    "bg-gradient-to-r",
    "from-gray-200",
    "via-white",
    "to-gray-200"
  );

  const boxes = Array(numberOfBoxes)
    .fill(0)
    .map((_, i) => {
      return (
        <div className={outerDiv} key={i}>
          <div className={innerDiv}></div>
        </div>
      );
    });

  return boxes;
}

export default Skeleton;
