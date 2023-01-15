import AppBanner from "../AppBanner";
import classes from "./AppAccount.module.scss";

function AppAccount({ children }) {
  return (
    <div className={classes.container}>
      <AppBanner />
      <div className={classes.main}>
        <div className={classes.children}>{children}</div>
      </div>
    </div>
  );
}

export default AppAccount;
