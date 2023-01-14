import AppButton from "../AppButton";
import AppLogo from "../AppLogo";
import classes from "./NavigationBar.module.scss";

function NavigationBar() {
  return (
    <nav className={classes.nav}>
      <AppLogo />
      <ul className={classes.links}>
        <AppButton text="Login" redirect="/login" flat icon="log-in" />
        <AppButton text="Sign Up" redirect="/signup" />
      </ul>
    </nav>
  );
}

export default NavigationBar;
