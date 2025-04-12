import React, { useState } from "react";
import "./Verify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import MetaData from "../MetaData/MetaData";
import { useAlert } from "react-alert";
const Verify = () => {
  const alert = useAlert();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(false);
  const { user, error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const email = user ? user.email : null;
  const navigate = useNavigate();
  const verifyOtp = async (e) => {
    e.preventDefault();
    console.log(otp);
    // console.log(email);
    const { data } = await axios.post(
      `http://localhost:8000/user/verify-otp`,
      {
        otp,
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(data.success);
    if (data.success) {
      alert.success(data.message);
    } else {
      alert.error("Not Verified");
    }
    // console.log(data.response.data);
  };
  return (
    <>
      <MetaData />
      <div className="verify-box">
        <h1
          style={{
            marginTop: "60px",
            textAlign: "center",
          }}>
          Verify OTP
        </h1>
        <form className="input-form" onSubmit={verifyOtp}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button type="submit">Verify</button>
        </form>
      </div>
    </>
  );
};

export default Verify;
