import FeatherIcon from "feather-icons-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../api";
import AppAccount from "../../components/AppAccount";
import AppButton from "../../components/AppButton";
import AppLogo from "../../components/AppLogo";
import FormInput from "../../components/FormInput";
import Stepper from "../../components/Stepper";
import checkValidation from "../../helpers/checkValidation";
import { initialSignupData, signupFormRules } from "../../helpers/rulesSignup";
import classes from "./SignUp.module.scss";

const defaultImage = require("../../images/default_profile_photo.png");

function SignUp() {
  const [firstStepData, setFirstStepData] = useState(initialSignupData);
  const [pictureFile, setPictureFile] = useState();
  const [errors, setErrors] = useState({});
  const [stepCounter, setStepCounter] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [defaultPicture, setdefaultPicture] = useState(defaultImage);

  const signupSteps = ["Account Information", "User Photo"];

  const navigate = useNavigate();

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
    setErrors(checkValidation(firstStepData, signupFormRules));
    setHasSubmitted(true);
  };

  const fileHandler = (e) => {
    setPictureFile(e.target.files[0]);
    setdefaultPicture(URL.createObjectURL(e.target.files[0]));
    setErrors({ ...errors, profile_picture: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(firstStepData).forEach((key) => {
      formData.append(key, firstStepData[key]);
    });
    console.log(firstStepData);
    formData.append("image", pictureFile);

    signup(formData)
      .then((res) => {
        // Toast this:
        console.log(res.data.message);
        navigate("/login");
      })
      .catch((err) => {
        const errorData = err.response.data.data;
        if (errorData.length > 0) {
          const tempErrors = {};
          errorData.forEach((error) => {
            tempErrors[error.param] = error.msg;
          });
          setErrors(tempErrors);
          backStep();
        } else {
          setErrors({ ...errors, profile_picture: err.response.data.message });
        }
      });
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

        <div className={classes["form-container"]}>
          <Stepper steps={signupSteps} counter={stepCounter} />

          <form
            onSubmit={handleSubmit}
            className={classes.form}
            encType="multipart/form-data"
          >
            {isValidated ? (
              <div className={classes["upload-photo"]}>
                <div className={classes["avatar-container"]}>
                  <img
                    src={defaultPicture}
                    alt="avatar"
                    className={classes.avatar}
                  />
                </div>

                <label htmlFor="profile-input" className={classes.uploader}>
                  <FeatherIcon icon="upload" className={classes.icon} />
                  Upload your photo
                </label>
                <input
                  id="profile-input"
                  type="file"
                  filename="profile_picture_url"
                  onChange={fileHandler}
                  hidden
                />
                <p className={classes.error}>{errors["profile_picture"]}</p>
              </div>
            ) : (
              <div className={classes.inputs}>
                <div className={classes.name}>
                  <FormInput
                    label="First Name"
                    value={firstStepData.first_name}
                    onChange={(e) => {
                      setFirstStepData({
                        ...firstStepData,
                        first_name: e.target.value,
                      });
                      setErrors({ ...errors, first_name: null });
                    }}
                    error={errors["first_name"]}
                  />

                  <FormInput
                    label="Last Name"
                    value={firstStepData.last_name}
                    onChange={(e) => {
                      setFirstStepData({
                        ...firstStepData,
                        last_name: e.target.value,
                      });
                      setErrors({ ...errors, last_name: null });
                    }}
                    error={errors["last_name"]}
                  />
                </div>

                <FormInput
                  label="Email"
                  value={firstStepData.email}
                  onChange={(e) => {
                    setFirstStepData({
                      ...firstStepData,
                      email: e.target.value,
                    });
                    setErrors({ ...errors, email: null });
                  }}
                  error={errors["email"]}
                />

                <FormInput
                  label="Username"
                  value={firstStepData.username}
                  onChange={(e) => {
                    setFirstStepData({
                      ...firstStepData,
                      username: e.target.value,
                    });
                    setErrors({ ...errors, username: null });
                  }}
                  error={errors["username"]}
                />

                <FormInput
                  type="password"
                  label="Password"
                  value={firstStepData.password}
                  onChange={(e) => {
                    setFirstStepData({
                      ...firstStepData,
                      password: e.target.value,
                    });
                    setErrors({ ...errors, password: null });
                  }}
                  error={errors["password"]}
                />
              </div>
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
