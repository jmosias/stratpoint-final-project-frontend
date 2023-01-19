import { Routes, Route, useLocation } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import ErrorPage from "./pages/Error404";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SingleBlog from "./pages/SingleBlog";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/login" && pathname !== "/signup" && <NavigationBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
