import { useEffect, useState } from "react";
import classes from "./AppBanner.module.scss";

const IMAGES = [
  require("../../images/ayam_goreng.webp"),
  require("../../images/singapore_chilli_crab.webp"),
  require("../../images/maple_glazed_ham.webp"),
  require("../../images/chocolate_custard_cake.webp"),
];

function AppBanner() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      counter >= IMAGES.length - 1 ? setCounter(0) : setCounter(counter + 1);
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
  }, [counter]);

  return (
    <div
      className={classes["image-container"]}
      style={{ backgroundImage: `url(${IMAGES[counter]})` }}
    ></div>
  );
}

export default AppBanner;
