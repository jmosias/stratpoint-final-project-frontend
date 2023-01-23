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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const dashboardHandler = () => {
    navigate("/dashboard/blogs");
  };

  const profileHandler = () => {
    navigate("/dashboard/profile");
  };

  const passwordHandler = () => {
    navigate("/dashboard/profile/password");
  };

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
            <div className={classes["avatar-container"]} onClick={toggleMenu}>
              <img
                src={imageUrl}
                alt="profile_picture"
                className={classes.avatar}
              />
              {isMenuOpen && (
                <ul className={classes.menu}>
                  <li className={classes.item} onClick={dashboardHandler}>
                    Go to Dashboard
                  </li>
                  <li className={classes.item} onClick={profileHandler}>
                    View Profile
                  </li>
                  <li className={classes.item} onClick={passwordHandler}>
                    Change Password
                  </li>
                  <li
                    className={`${classes.item} ${classes.logout}`}
                    onClick={logoutHandler}
                  >
                    Logout
                  </li>
                </ul>
              )}
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
