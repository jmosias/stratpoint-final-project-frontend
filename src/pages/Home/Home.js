import classes from "./Home.module.scss";

import { useEffect, useState } from "react";
import { BASE_URL, getBlogsByUser } from "../../api";
import { useNavigate } from "react-router-dom";
import AppLoader from "../../components/AppLoader";
// import AppButton from "../../components/AppButton";

const ADMIN_ID = "63c9ac5dbd0fb2fce66f8221";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

  // const createHandler = () => {
  //   const data = {
  //     title: "Sunday Chili",
  //     description:
  //       "It’s thick and appropriately chunky, spicy and extremely flavorful without being hot, balanced just right between meat, beans, and vegetables, and excellently scoopable (what else is chili for, really). And not to mention it does that chili magic thing where it GETS BETTER AS LEFTOVERS. There’s just something about a slow-simmered chili on a Sunday that’s chock-full of cozy goodness.",
  //     cover_picture_url: `/images/blogs/${ADMIN_ID}/sunday_chili.jpg`,
  //   };
  //   createBlog(data)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(err));
  // };

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
      {/* <AppButton text="Create" onClick={createHandler} /> */}
      {isLoading && <AppLoader />}
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
