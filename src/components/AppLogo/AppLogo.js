import { Link } from "react-router-dom";
import classes from "./AppLogo.module.scss";

function AppLogo({ fontSize }) {
  return (
    <Link
      className={classes.logo}
      style={{ fontSize: fontSize || "2rem" }}
      to="/"
    >
      Red Recipes
    </Link>
  );
}

export default AppLogo;
