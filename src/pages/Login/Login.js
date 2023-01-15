import AppAccount from "../../components/AppAccount";
import AppLogo from "../../components/AppLogo";
import classes from "./Login.module.scss";

function Login() {
  return (
    <AppAccount>
      <div className={classes.login}>
        <AppLogo />
        <p>Login Page</p>
      </div>
    </AppAccount>
  );
}

export default Login;
