import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, login } from "../../api";
import AppAccount from "../../components/AppAccount";
import AppButton from "../../components/AppButton";
import AppLogo from "../../components/AppLogo";
import FormInput from "../../components/FormInput";
import checkValidation from "../../helpers/checkValidation";
import { initialLoginData, loginFormRules } from "../../helpers/rulesLogin";
import classes from "./Login.module.scss";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialLoginData);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors(checkValidation(formData, loginFormRules));
    setHasSubmitted(true);
  };

  const handleLogin = useCallback(() => {
    if (Object.keys(errors).length === 0) {
      login(formData)
        .then((res) => {
          // Toast this
          console.log(res.data.message);
          localStorage.setItem("appToken", res.data.token);
          getUser(res.data.userId).then((res) => {
            localStorage.setItem("userData", JSON.stringify(res.data));
            navigate("/");
          });
        })
        .catch((err) => {
          const errorData = err.response.data;
          setErrors({
            [errorData.formType]: errorData.message,
          });
        });
    }
  }, [formData, errors, navigate]);

  useEffect(() => {
    if (hasSubmitted) {
      handleLogin();
      setHasSubmitted(false);
    }
  }, [hasSubmitted, handleLogin]);

  return (
    <AppAccount>
      <div className={classes.login}>
        <div className={classes.header}>
          <AppLogo fontSize="0.9rem" />
          <h2 className={classes.title}>Welcome back!</h2>
        </div>

        <div className={classes["form-container"]}>
          <form onSubmit={handleSubmit} className={classes.form}>
            <div className={classes.inputs}>
              <FormInput
                label="Email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setErrors({ ...errors, email: null });
                }}
                error={errors["email"]}
              />

              <FormInput
                type="password"
                label="Password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  setErrors({ ...errors, password: null });
                }}
                error={errors["password"]}
              />
            </div>

            <div className={classes.buttons}>
              <AppButton text="Login" type="submit" isLoading={isLoading} />
            </div>
          </form>
        </div>

        <p className={classes.note}>
          Don't have an account yet?
          <span>
            <Link to="/signup" className={classes.link}>
              Sign up for free
            </Link>
          </span>
        </p>
      </div>
    </AppAccount>
  );
}

export default Login;
