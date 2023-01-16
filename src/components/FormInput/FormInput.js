import { useId } from "react";
import classes from "./FormInput.module.scss";

function FormInput({ type, label, placeholder, value, onChange, error }) {
  const id = useId();

  return (
    <div className={classes.group}>
      <label htmlFor={id} className={classes.label}>
        {label}
      </label>
      <input
        id={id}
        type={type || "text"}
        placeholder={placeholder}
        className={classes.input + " " + (error ? classes.error : "")}
        value={value}
        onChange={onChange}
      />
      <p className={classes["error-message"]}>{error}</p>
    </div>
  );
}

export default FormInput;
