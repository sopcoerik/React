import { useState } from "react";

import bird from "./svg/bird.svg";
import cat from "./svg/cat.svg";
import horse from "./svg/horse.svg";
import gator from "./svg/gator.svg";
import dog from "./svg/dog.svg";
import cow from "./svg/cow.svg";
import heart from "./svg/heart.svg";

export default function AnimalShow({ type, key }) {
  const [heartSize, setHeartSize] = useState(5);

  const animalsObj = {
    bird,
    cat,
    horse,
    gator,
    dog,
    cow,
    heart,
  };

  const handleAnimalClick = () => {
    setHeartSize(heartSize * 2 - 3);
  };

  return (
    <div>
      <div className="animals">
        <div onClick={handleAnimalClick} key={key}>
          <img src={animalsObj[type]} className="animal" />
          <img
            src={heart}
            className="heart"
            style={{ width: `${heartSize}px` }}
          />
        </div>
      </div>
    </div>
  );
}
