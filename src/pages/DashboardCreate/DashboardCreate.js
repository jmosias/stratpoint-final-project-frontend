import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, createBlog } from "../../api";
import AppButton from "../../components/AppButton";
import classes from "./DashboardCreate.module.scss";

const inititalFormData = {
  title: "",
  description: "",
};

function DashboardCreate() {
  const [isPosting, setIsPosting] = useState(false);
  const [formData, setFormData] = useState(inititalFormData);
  const [pictureFile, setPictureFile] = useState();
  const [pictureUrl, setPictureUrl] = useState(
    BASE_URL + "/images/no-image.webp"
  );
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const fileHandler = (e) => {
    setPictureFile(e.target.files[0]);
    setPictureUrl(URL.createObjectURL(e.target.files[0]));
    setErrors({ ...errors, cover_picture: null });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setIsPosting(true);

    const finalData = new FormData();
    Object.keys(formData).forEach((key) => {
      finalData.append(key, formData[key]);
    });
    finalData.append("image", pictureFile);

    createBlog(finalData)
      .then((res) => {
        // Toast this:
        console.log(res.data.message);
        navigate("/dashboard/blogs");
      })
      .catch((err) => {
        setIsPosting(false);
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

  return (
    <>
      <div className={classes.dashboard}>
        <h2 className={classes["page-title"]}>Dashboard - Create a new Blog</h2>
        {pictureUrl && (
          <div className={classes.blog}>
            <div className={classes.photo}>
              <div className={classes["image-container"]}>
                <img
                  src={pictureUrl}
                  alt={formData.title}
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
                disabled={isPosting}
                hidden
              />
              <p className={classes.error}>{errors["cover_picture"]}</p>
            </div>
            <form
              onSubmit={handleCreate}
              className={classes.info}
              encType="multipart/form-data"
            >
              <input
                type="text"
                className={classes.title}
                value={formData.title}
                placeholder="New Post"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  });
                  setErrors({ ...errors, title: null });
                }}
                error={errors["title"]}
                disabled={isPosting}
              />
              <textarea
                className={classes.description}
                value={formData.description}
                placeholder="Add some description here ..."
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  });
                  setErrors({ ...errors, description: null });
                }}
                error={errors["description"]}
                disabled={isPosting}
              ></textarea>
              <div className={classes.buttons}>
                <AppButton
                  secondary
                  text="Back"
                  onClick={() => navigate(-1)}
                  disabled={isPosting}
                />
                <AppButton
                  text="Create"
                  type="submit"
                  isLoading={isPosting}
                  disabled={!formData.title || !formData.description}
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default DashboardCreate;
