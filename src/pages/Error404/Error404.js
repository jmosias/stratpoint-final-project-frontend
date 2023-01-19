import AppButton from "../../components/AppButton";
import classes from "./Error404.module.scss";

function Error404() {
  return (
    <div className={classes.error}>
      <div>
        <h2 className={classes.title}>404</h2>
        <p className={classes.description}>this page does not exist</p>
      </div>
      <AppButton text="Go Home" redirect="/" />
    </div>
  );
}

export default Error404;
