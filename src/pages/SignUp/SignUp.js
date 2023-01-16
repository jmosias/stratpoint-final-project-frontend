import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppAccount from "../../components/AppAccount";
import AppButton from "../../components/AppButton";
import AppLogo from "../../components/AppLogo";
import FormInput from "../../components/FormInput";
import Stepper from "../../components/Stepper";
import checkValidation from "../../helpers/checkValidation";
import { initialSignupData, signupFormRules } from "../../helpers/rulesSignup";
import classes from "./SignUp.module.scss";

function SignUp() {
  const [formData, setFormData] = useState(initialSignupData);
  const [errors, setErrors] = useState({});
  const [stepCounter, setStepCounter] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  const signupSteps = ["Account Information", "User Photo"];

  // If no form errors, continue to next step
  const nextStep = useCallback(() => {
    if (Object.keys(errors).length === 0) {
      setIsValidated(true);
      stepCounter >= signupSteps.length - 1
        ? setStepCounter(0)
        : setStepCounter(stepCounter + 1);
    }
  }, [signupSteps.length, stepCounter, errors]);

  const backStep = () => {
    setIsValidated(false);
    setStepCounter(stepCounter - 1);
  };

  const handleNext = () => {
    setErrors(checkValidation(formData, signupFormRules));
    setHasSubmitted(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  useEffect(() => {
    if (hasSubmitted) {
      nextStep();
      setHasSubmitted(false);
    }
  }, [hasSubmitted, nextStep]);

  return (
    <AppAccount>
      <div className={classes.signup}>
        <div className={classes.header}>
          <AppLogo fontSize="0.9rem" />
          <h2 className={classes.title}>Create an Account</h2>
        </div>

        <div className={classes.formContainer}>
          <Stepper steps={signupSteps} counter={stepCounter} />

          <form onSubmit={handleSubmit}>
            {isValidated ? (
              <div>change photo here</div>
            ) : (
              <>
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
                  type="password"
                  label="Password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setErrors({ ...errors, password: null });
                  }}
                  error={errors["password"]}
                />
              </>
            )}

            {/* FORM BUTTONS */}
            {isValidated ? (
              <div className={classes.buttons}>
                <AppButton text="Back" flat onClick={backStep} />
                <AppButton text="Create Account" type="submit" />
              </div>
            ) : (
              <div className={classes.buttons}>
                <AppButton text="Continue" onClick={handleNext} />
              </div>
            )}
          </form>
        </div>

        <p className={classes.note}>
          Already have an account?
          <span>
            <Link to="/login" className={classes.link}>
              Login
            </Link>
          </span>
        </p>
      </div>
    </AppAccount>
  );
}

export default SignUp;
