import React, { useState } from "react";
import "./UpdateProfile.css";
import { useAlert } from "react-alert";
const UpdatePassword = () => {
  alert = useAlert();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const updatePasswordHandler = () => {
    console.log("hello world");
    console.log(newPassword);
    if (newPassword !== confirmPassword) {
      window.alert("New Password and update Password must be same");
    }
  };
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
