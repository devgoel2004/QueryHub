import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, updatePassword } from "../../actions/userActions";
import Loader from "../Loader/Loader";
const UpdatePassword = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const updatePasswordHandler = (e) => {
    e.preventDefault();
    const userData = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    if (newPassword !== confirmPassword) {
      window.alert("New Password and update Password must be same");
    }
    dispatch(updatePassword(userData));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    const timeOut = setTimeout(() => {
      if (!isAuthenticated) {
        alert.error("Login to access this resource");
        navigate(`/queryhub/login`);
      }
    }, 2000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [isAuthenticated, alert, navigate, error]);
  return loading ? (
    <>
      <Loader />
    </>
  ) : (
    <>
      <div className="update-password">
        <form action="" className="form" onSubmit={updatePasswordHandler}>
          <input
            onChange={(e) => setOldPassword(e.target.value)}
            type="password"
            placeholder="Old Password"
          />
          <input
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
          />
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          <input type="submit" value="Update" className="button" />
        </form>
      </div>
    </>
  );
};

export default UpdatePassword;
