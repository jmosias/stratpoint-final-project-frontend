import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL, getBlog, patchBlog } from "../../api";
import AppButton from "../../components/AppButton";
import classes from "./DashboardSingleBlog.module.scss";

const inititalFormData = {
  title: "",
  description: "",
};

function DashboardSingleBlog() {
  const [blog, setBlog] = useState(null);
  const [formData, setFormData] = useState(inititalFormData);
  const [pictureFile, setPictureFile] = useState();
  const [pictureUrl, setPictureUrl] = useState();
  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  const fileHandler = (e) => {
    console.log(e.target.files[0]);
    setPictureFile(e.target.files[0]);
    setPictureUrl(URL.createObjectURL(e.target.files[0]));
    setErrors({ ...errors, cover_picture: null });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const finalData = new FormData();
    Object.keys(formData).forEach((key) => {
      finalData.append(key, formData[key]);
    });
    // console.log(pictureFile);
    // if (pictureFile)
    finalData.append("cover_picture", pictureFile);

    patchBlog(id, formData)
      .then((res) => {
        // Toast this:
        console.log(res.data.message);
        navigate(0);
      })
      .catch((err) => {
        const errorData = err.response.data.data;
        if (errorData.length > 0) {
          const tempErrors = {};
          errorData.forEach((error) => {
            tempErrors[error.param] = error.msg;
          });
          setErrors(tempErrors);
        } else {
          setErrors({ ...errors, cover_picture: err.response.data.message });
        }
      });
  };

  useEffect(() => {
    getBlog(id)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        description: blog.description,
      });
      setPictureUrl(BASE_URL + blog.cover_picture_url);
    }
  }, [blog]);

  return (
    <div className={classes.dashboard}>
      <h2 className={classes["page-title"]}>Dashboard</h2>
      {blog && pictureUrl && (
        <div className={classes.blog}>
          <div className={classes.photo}>
            <div className={classes["image-container"]}>
              <img
                src={pictureUrl}
                alt={blog.title}
                className={classes.image}
              />
            </div>
            <label htmlFor="cover-input" className={classes.uploader}>
              <FeatherIcon icon="upload" className={classes.icon} />
              Change image
            </label>
            <input
              id="cover-input"
              type="file"
              filename="cover_picture_url"
              onChange={fileHandler}
              hidden
            />
            <p className={classes.error}>{errors["cover_picture"]}</p>
          </div>
          <form
            onSubmit={handleUpdate}
            className={classes.info}
            encType="multipart/form-data"
          >
            <input
              type="text"
              className={classes.title}
              value={formData.title}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  title: e.target.value,
                });
                setErrors({ ...errors, title: null });
              }}
              error={errors["title"]}
            />
            <textarea
              className={classes.description}
              value={formData.description}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  description: e.target.value,
                });
                setErrors({ ...errors, description: null });
              }}
              error={errors["description"]}
            ></textarea>
            <div className={classes.buttons}>
              <AppButton text="Update" type="submit" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default DashboardSingleBlog;
