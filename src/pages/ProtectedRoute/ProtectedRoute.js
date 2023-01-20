import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [hasChecked, setHasChecked] = useState(false);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  const goToLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    if (hasChecked) {
      if (token) {
        setIsLoggedIn(true);
      } else {
        goToLogin();
      }
    }
  }, [token, hasChecked, goToLogin]);

  useEffect(() => {
    setToken(localStorage.getItem("appToken"));
    setHasChecked(true);
  }, []);

  return <>{isLoggedIn && hasChecked && <div>{children}</div>}</>;
}

export default ProtectedRoute;
