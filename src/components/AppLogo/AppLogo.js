import { Link } from "react-router-dom";
import classes from "./AppLogo.module.scss";

function AppLogo() {
  return (
    <Link className={classes.logo} to="/">
      Red Recipes
    </Link>
  );
}

export default AppLogo;
