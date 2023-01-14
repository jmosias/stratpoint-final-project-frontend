import FeatherIcon from "feather-icons-react";
import { useNavigate } from "react-router-dom";
import classes from "./AppButton.module.scss";

function AppButton({ text, icon, redirect, clickHandler, disabled, flat }) {
  const navigate = useNavigate();

  const buttonClickHandler = async () => {
    if (clickHandler) await clickHandler();
    if (redirect) navigate(redirect);
  };

  return (
    <button
      className={classes.button + " " + (flat ? classes.flat : "")}
      onClick={buttonClickHandler}
      disabled={disabled}
    >
      {icon && <FeatherIcon icon={icon} className={classes.icon} />}
      {text}
    </button>
  );
}

export default AppButton;
