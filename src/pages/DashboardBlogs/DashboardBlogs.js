import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, getBlogsByUser, softDeleteBlog } from "../../api";
import AppButton from "../../components/AppButton";
import classes from "./DashboardBlogs.module.scss";

function DashboardBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    softDeleteBlog(id)
      .then((res) => {
        navigate(0);
      })
      .catch((err) => console.log(err));
  };

  const goToDashboardBlog = (id) => {
    navigate(`/dashboard/blogs/${id}`);
  };

  useEffect(() => {
    if (user) {
      getBlogsByUser(user._id)
        .then((res) => {
          setBlogs(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userData")));
  }, []);

  return (
    <div className={classes.dashboard}>
      <h2 className={classes["page-title"]}>Dashboard</h2>
      <div className={classes.blogs}>
        {blogs ? (
          blogs.map((blog) => (
            <div key={blog._id} className={classes.blog}>
              <div className={classes["image-container"]}>
                <img
                  src={BASE_URL + blog.cover_picture_url}
                  alt={blog.title}
                  className={classes.image}
                />
              </div>
              <div className={classes.info}>
                <h3 className={classes.title}>{blog.title}</h3>
                <div className={classes.buttons}>
                  <AppButton
                    text="Update"
                    onClick={() => goToDashboardBlog(blog._id)}
                  />
                  <AppButton
                    secondary
                    text="Delete"
                    onClick={() => handleDelete(blog._id)}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>You haven't uploaded a blog yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardBlogs;
