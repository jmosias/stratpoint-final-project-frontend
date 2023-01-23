import classes from "./Home.module.scss";

import { useEffect, useState } from "react";
import { BASE_URL, getBlogsByUser } from "../../api";
import { useNavigate } from "react-router-dom";
import AppLoader from "../../components/AppLoader";
import SearchBar from "../../components/SearchBar";

const ADMIN_ID = "63c9ac5dbd0fb2fce66f8221";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

  const goToBlog = (id) => {
    navigate(`/blogs/${id}`);
  };

  useEffect(() => {
    getBlogsByUser(ADMIN_ID)
      .then((res) => {
        setBlogs(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {isLoading && <AppLoader />}
      {!isLoading && blogs && <SearchBar blogs={blogs} url="/blogs/" />}
      <div className={classes.blogs}>
        {blogs &&
          blogs.map((blog) => (
            <div
              key={blog._id}
              className={classes.blog}
              onClick={() => goToBlog(blog._id)}
            >
              <div className={classes["image-container"]}>
                <img
                  src={BASE_URL + "/" + blog.cover_picture_url}
                  alt={blog.title}
                  className={classes.image}
                />
              </div>
              <h3 className={classes.title}>{blog.title}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
