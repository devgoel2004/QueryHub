import React, { useState } from "react";
import "./Login.css";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../MetaData/MetaData";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginSubmit = () => {};
  const handleGoogleLogin = () => {
    window.open("http://localhost:8000/auth/google", "_self");
  };
  return (
    <>
      <MetaData title={`Login Page`} />
      <div className="body">
        <div className="container" id="container">
          <div className="form-container sign-in-container">
            <form className="form-login" onSubmit={loginSubmit}>
              <h1>Sign in</h1>
              <div className="social-container">
                <a onClick={handleGoogleLogin} href="#" className="social">
                  <FcGoogle className="icons" />
                </a>
              </div>
              <span>or use your account</span>
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
              <Link to="/queryhub/forgot/password">Forgot your password?</Link>
              <button type="submit" className="button">
                Sign In
              </button>
              <p className="create-account">
                Create Account:{" "}
                <span onClick={() => navigate("/queryhub/signup")}>SignUp</span>
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
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  onClick={() => {
                    navigate("/queryhub/signup");
                  }}
                  className="ghost button"
                  id="signUp">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
