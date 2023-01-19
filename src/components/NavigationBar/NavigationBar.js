import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, logout } from "../../api";
import AppButton from "../AppButton";
import AppLogo from "../AppLogo";
import classes from "./NavigationBar.module.scss";

function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

  const logoutHandler = () => {
    logout(() => {
      navigate(0);
    });
  };

  useEffect(() => {
    if (token && user) {
      setIsLoggedIn(true);
      setImageUrl(BASE_URL + "/" + user.profile_picture_url);
    }
  }, [token, user]);

  useEffect(() => {
    setToken(localStorage.getItem("appToken"));
    setUser(JSON.parse(localStorage.getItem("userData")));
  }, []);

  return (
    <nav className={classes.nav}>
      <AppLogo />
      <ul className={classes.links}>
        {isLoggedIn ? (
          <>
            <p className={classes.username}>{user.username}</p>
            <div
              className={classes["avatar-container"]}
              onClick={logoutHandler}
            >
              <img
                src={imageUrl}
                alt="profile_picture"
                className={classes.avatar}
              />
            </div>
          </>
        ) : (
          <>
            <AppButton text="Login" redirect="/login" flat icon="log-in" />
            <AppButton text="Sign Up" redirect="/signup" />
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavigationBar;
