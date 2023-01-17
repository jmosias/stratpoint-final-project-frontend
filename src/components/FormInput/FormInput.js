import FeatherIcon from "feather-icons-react";
import { useId, useState } from "react";
import classes from "./FormInput.module.scss";

function FormInput({ type, label, placeholder, value, onChange, error }) {
  const id = useId();

  const [passwordType, setPasswordType] = useState("password");

  const togglePasswordType = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    <div className={classes.group}>
      <label htmlFor={id} className={classes.label}>
        {label}
      </label>
      <div className={classes["input-container"]}>
        <input
          id={id}
          type={type === "password" ? passwordType : "text"}
          placeholder={placeholder}
          className={classes.input + " " + (error ? classes.error : "")}
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <div
            className={classes["icon-container"]}
            onClick={togglePasswordType}
          >
            <FeatherIcon
              icon={passwordType === "password" ? "eye" : "eye-off"}
              className={classes.icon}
            />
          </div>
        )}
      </div>
      <p className={classes["error-message"]}>{error}</p>
    </div>
  );
}

export default FormInput;
