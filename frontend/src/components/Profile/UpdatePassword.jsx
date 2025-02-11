import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../actions/userActions";
const UpdatePassword = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const updatePasswordHandler = (e) => {
    e.preventDefault();
    const userData = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    console.log("hello world");
    console.log(newPassword);
    if (newPassword !== confirmPassword) {
      window.alert("New Password and update Password must be same");
    }
    dispatch(updatePassword(userData));
  };
  useEffect(() => {
    if (!isAuthenticated) {
      // alert.error("login to access this resources");
      // navigate("/queryhub/login");
    }
    console.log(user);
  }, [isAuthenticated]);
  return (
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
