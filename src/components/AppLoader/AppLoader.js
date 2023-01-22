import classes from "./AppLoader.module.scss";

function AppLoader() {
  return (
    <div className={classes.container}>
      <div className={classes.loader}></div>
      <p className={classes.text}>Please wait ...</p>
    </div>
  );
}

export default AppLoader;
