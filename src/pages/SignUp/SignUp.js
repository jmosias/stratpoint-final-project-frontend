import AppAccount from "../../components/AppAccount";
import AppLogo from "../../components/AppLogo";
import classes from "./SignUp.module.scss";

function SignUp() {
  return (
    <AppAccount>
      <div className={classes.signup}>
        <AppLogo />
        <p>Sign Up Page</p>
      </div>
    </AppAccount>
  );
}

export default SignUp;
