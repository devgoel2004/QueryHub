import React, { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../MetaData/MetaData";
const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const signupSubmit = () => {};
  const handleGoogleSignup = () => {
    window.open("http://localhost:8000/auth/google", "_self");
  };
  return (
    <>
      <MetaData title={"Sign Up Page"} />
      <div className="body">
        <div className="container" id="container">
          <div className="form-container sign-in-container">
            <form className="form-login" onSubmit={signupSubmit}>
              <h1>Sign Up</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <FaGithub className="icons"></FaGithub>
                </a>
                <a onClick={handleGoogleSignup} href="#" className="social">
                  <FcGoogle className="icons" />
                </a>
                <a href="#" className="social">
                  <FaLinkedin className="icons" />
                </a>
              </div>
              <span>or use your account</span>
              <input
                className="input"
                type="username"
                placeholder="User Name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                className="input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="button">
                Register
              </button>
              <p className="create-account">
                Have Account:{" "}
                <span onClick={() => navigate("/queryhub/login")}>Login</span>
              </p>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button className="ghost" id="signIn">
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Developers!</h1>
                <p>Enter your personal details and start journey with us</p>
                <p style={{ fontSize: "small" }}>Have Account? </p>
                <button
                  onClick={() => {
                    navigate("/queryhub/login");
                  }}
                  className="ghost button"
                  id="signUp">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
