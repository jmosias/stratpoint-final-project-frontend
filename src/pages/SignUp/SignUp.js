import { useState } from "react";
import AppAccount from "../../components/AppAccount";
import AppButton from "../../components/AppButton";
import AppLogo from "../../components/AppLogo";
import FormInput from "../../components/FormInput";
import checkValidation from "../../helpers/checkValidation";
import { initialSignupData, signupFormRules } from "../../helpers/rulesSignup";
import classes from "./SignUp.module.scss";

function SignUp() {
  const [formData, setFormData] = useState(initialSignupData);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(checkValidation(formData, signupFormRules));
  };

  return (
    <AppAccount>
      <div className={classes.signup}>
        <AppLogo />
        <p style={{ paddingTop: "3rem" }}></p>

        <form onSubmit={handleSubmit}>
          <div className={classes.name}>
            <FormInput
              label="First Name"
              value={formData.firstName}
              onChange={(e) => {
                setFormData({ ...formData, firstName: e.target.value });
                setErrors({ ...errors, firstName: null });
              }}
              error={errors["firstName"]}
            />

            <FormInput
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => {
                setFormData({ ...formData, lastName: e.target.value });
                setErrors({ ...errors, lastName: null });
              }}
              error={errors["lastName"]}
            />
          </div>

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
            label="Username"
            value={formData.username}
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
              setErrors({ ...errors, username: null });
            }}
            error={errors["username"]}
          />

          <FormInput
            label="Password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              setErrors({ ...errors, password: null });
            }}
            error={errors["password"]}
          />
          <AppButton text="Next" />
        </form>
      </div>
    </AppAccount>
  );
}

export default SignUp;
