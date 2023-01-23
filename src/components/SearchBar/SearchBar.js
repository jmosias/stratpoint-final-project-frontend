import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SearchBar.module.scss";

function SearchBar({ blogs, url }) {
  const [filter, setFilter] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const navigate = useNavigate();

  const handleChange = (text) => {
    setFilter(text);
    setFilteredBlogs(
      blogs.filter((blog) =>
        blog.title.toLowerCase().includes(text.toLowerCase())
      )
    );
    if (text === "") setFilteredBlogs([]);
  };

  return (
    <div className={classes.container}>
      <div className={classes["search-bar"]}>
        <FeatherIcon icon="search" className={classes.icon} />
        <input
          type="text"
          value={filter}
          className={classes.text}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <div className={classes.list}>
        {filteredBlogs &&
          filteredBlogs.map((blog) => {
            return (
              <div
                key={blog._id}
                className={classes.item}
                onClick={() => navigate(url + blog._id)}
              >
                <p className={classes.title}>{blog.title}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SearchBar;
