import FeatherIcon from "feather-icons-react";
import { useNavigate } from "react-router-dom";
import classes from "./AppButton.module.scss";

function AppButton({
  type,
  text,
  icon,
  redirect,
  onClick,
  disabled,
  flat,
  secondary,
  isLoading,
}) {
  const navigate = useNavigate();

  const buttonClickHandler = async () => {
    if (onClick) await onClick();
    if (redirect) navigate(redirect);
  };

  return (
    <button
      type={type || "button"}
      className={
        classes.button +
        " " +
        (flat ? classes.flat : "") +
        " " +
        (secondary ? classes.secondary : "") +
        " " +
        (disabled ? classes.disabled : "") +
        " " +
        (isLoading ? classes.loading : "")
      }
      onClick={buttonClickHandler}
      disabled={disabled || isLoading}
    >
      {isLoading && <span className={classes.loader}></span>}
      {icon && <FeatherIcon icon={icon} className={classes.icon} />}
      {text}
    </button>
  );
}

export default AppButton;
