import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../MetaData/MetaData";
import { clearErrors, register } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
const Signup = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [user, setUser] = useState({
    email: "",
    name: "",
    image: "",
    password: "",
  });
  const signupSubmit = (e) => {
    e.preventDefault();
    console.log("hello world");
    // console.log(user);
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("image", image);
    dispatch(register(myForm));
  };
  const handleGoogleSignup = () => {
    window.open("http://localhost:8000/auth/google", "_self");
  };
  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      alert.success("Already Logged In");
      navigate(`/queryhub/login`);
    }
  }, [dispatch, error, alert, isAuthenticated]);
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
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                className="input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                className="input"
                type="file"
                placeholder="Image"
                value={image}
                accept="image/*"
                onChange={(e) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    if (reader.readyState === 2) {
                      setImage(reader.result);
                      setImagePreview(reader.result);
                    }
                  };
                  reader.readAsDataURL(e.target.files[0]);
                }}
              />
              <img src={imagePreview} alt="" />
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
