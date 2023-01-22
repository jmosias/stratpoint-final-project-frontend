import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, updateUser } from "../../api";
import AppButton from "../../components/AppButton";
import FormInput from "../../components/FormInput";
import classes from "./DashboardProfile.module.scss";

const inititalFormData = {
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  password: "",
};

function DashboardProfile() {
  const [user, setUser] = useState();
  const [formData, setFormData] = useState(inititalFormData);
  const [pictureFile, setPictureFile] = useState();
  const [pictureUrl, setPictureUrl] = useState();
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const fileHandler = (e) => {
    setPictureFile(e.target.files[0]);
    setPictureUrl(URL.createObjectURL(e.target.files[0]));
    setErrors({ ...errors, profile_picture: null });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const finalData = new FormData();
    Object.keys(formData).forEach((key) => {
      finalData.append(key, formData[key]);
    });
    finalData.append("image", pictureFile);

    updateUser(user._id, finalData)
      .then((res) => {
        // Toast this:
        console.log(res.data.message);
        localStorage.setItem("userData", JSON.stringify(res.data));
        setUser(JSON.parse(localStorage.getItem("userData")));
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
          setErrors({ ...errors, profile_picture: err.response.data.message });
        }
      });
  };

  useEffect(() => {
    if (user) {
      setPictureUrl(BASE_URL + "/" + user.profile_picture_url);
      setFormData(user);
    }
  }, [user]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userData")));
  }, []);

  return (
    <>
      {user && pictureUrl && (
        <div className={classes.profile}>
          <h2 className={classes.title}>User Profile</h2>
          <form
            onSubmit={handleUpdate}
            className={classes.form}
            encType="multipart/form-data"
          >
            <div className={classes.photo}>
              <div className={classes["image-container"]}>
                <img
                  src={pictureUrl}
                  alt={user.username}
                  className={classes.image}
                />
              </div>
              <label htmlFor="profile-input" className={classes.uploader}>
                <FeatherIcon icon="upload" className={classes.icon} />
                Change image
              </label>
              <input
                id="profile-input"
                type="file"
                filename="profile_picture_url"
                onChange={fileHandler}
                hidden
              />
              <p className={classes.error}>{errors["profile_picture"]}</p>
            </div>

            <div className={classes.info}>
              <div className={classes.name}>
                <FormInput
                  label="First Name"
                  value={formData.first_name}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      first_name: e.target.value,
                    });
                    setErrors({ ...errors, first_name: null });
                  }}
                  error={errors["first_name"]}
                />

                <FormInput
                  label="Last Name"
                  value={formData.last_name}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      last_name: e.target.value,
                    });
                    setErrors({ ...errors, last_name: null });
                  }}
                  error={errors["last_name"]}
                />
              </div>

              <FormInput
                label="Email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  });
                  setErrors({ ...errors, email: null });
                }}
                error={errors["email"]}
              />

              <FormInput
                label="Username"
                value={formData.username}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    username: e.target.value,
                  });
                  setErrors({ ...errors, username: null });
                }}
                error={errors["username"]}
              />

              {/* <FormInput
                type="password"
                label="Password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  });
                  setErrors({ ...errors, password: null });
                }}
                error={errors["password"]}
              /> */}

              <div className={classes.buttons}>
                <AppButton text="Update Profile" type="submit" />
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default DashboardProfile;
