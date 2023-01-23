import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, updatePassword } from "../../api";
import AppButton from "../../components/AppButton";
import FormInput from "../../components/FormInput";
import classes from "./DashboardPassword.module.scss";

const inititalFormData = {
  old_password: "",
  new_password: "",
};

function DashboardPassword() {
  const [isPosting, setIsPosting] = useState(false);
  const [formData, setFormData] = useState(inititalFormData);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsPosting(true);

    updatePassword(formData)
      .then((res) => {
        // Toast this:
        console.log(res.data.message);
        logout(() => {
          navigate("/login");
        });
      })
      .catch((err) => {
        setIsPosting(false);
        const errorData = err.response.data;
        console.log(errorData);
        setErrors({
          [errorData.formType]: errorData.message,
        });
      });
  };

  return (
    <div className={classes.profile}>
      <h2 className={classes.title}>User Profile</h2>
      <form onSubmit={handleUpdate} className={classes.form}>
        <div className={classes.info}>
          <FormInput
            type="password"
            label="Old Password"
            value={formData.old_password}
            onChange={(e) => {
              setFormData({
                ...formData,
                old_password: e.target.value,
              });
              setErrors({ ...errors, old_password: null });
            }}
            error={errors["old_password"]}
          />
          <FormInput
            type="password"
            label="New Password"
            value={formData.new_password}
            onChange={(e) => {
              setFormData({
                ...formData,
                new_password: e.target.value,
              });
              setErrors({ ...errors, new_password: null });
            }}
            error={errors["new_password"]}
          />

          <div className={classes.buttons}>
            <AppButton
              text="Change Password"
              type="submit"
              isLoading={isPosting}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default DashboardPassword;
