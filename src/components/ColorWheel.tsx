import { useState, Fragment } from "react";
import Wheel from "@uiw/react-color-wheel";

const ColorWheel = () => {
  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
  return (
    <Fragment>
      <Wheel
        color={hsva}
        onChange={(color) => setHsva({ ...hsva, ...color.hsva })}
      />
    </Fragment>
  );
};

export default ColorWheel;
