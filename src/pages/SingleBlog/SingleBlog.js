import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, getBlog, getUser } from "../../api";
import AppLoader from "../../components/AppLoader";
import classes from "./SingleBlog.module.scss";

function SingleBlog() {
  const [isLoading, setIsLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const [creator, setCreator] = useState(null);
  const { id } = useParams();

  const dateFormat = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    getBlog(id)
      .then((res) => {
        setBlog(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (blog) {
      getUser(blog.user_id)
        .then((res) => {
          setCreator(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [blog]);

  return (
    <>
      {isLoading && <AppLoader />}
      {blog && creator && (
        <div className={classes.blog}>
          <div className={classes["image-container"]}>
            <img
              src={BASE_URL + "/" + blog.cover_picture_url}
              alt={blog.title}
              className={classes.image}
            />
          </div>
          <div className={classes.info}>
            <h2 className={classes.title}>{blog.title}</h2>
            <div className={classes.small}>
              <p className={classes.creator}>
                <span className={classes.span}>by </span>
                {`${creator.first_name} ${creator.last_name}`}
              </p>
              <p className={classes.date}>
                {new Date(blog.createdAt).toLocaleDateString(
                  "en-US",
                  dateFormat
                )}
              </p>
            </div>
            <p className={classes.description}>{blog.description}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleBlog;
