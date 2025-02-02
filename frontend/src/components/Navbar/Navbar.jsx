import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import { FaBars } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import "./Navbar.css";
import { useAlert } from "react-alert";
import axios from "axios";
import Cookies from "js-cookie";
const Navbar = () => {
  const navigate = useNavigate();
  const User = null;
  const alert = useAlert();
  const [image, setImage] = useState("");
  const Logo =
    "https://p7.hiclipart.com/preview/911/267/631/web-development-computer-icons-website.jpg";
  const searchImage =
    "https://raw.githubusercontent.com/devgoel2004/StackOverFlow/63b2210d972557dd7f203701122e1d0805f1abd4/client/src/assests/search.svg";
  const [handler, setHandler] = useState(false);
  const handleSlideIn = () => {
    setHandler(!handler);
  };
  // const handleLogout = () => {
  //   window.open("http://localhost:8000/auth/logout", "_self");
  // };
  // const fetchUser = async () => {
  //   try {
  //     const { data } = await axios.get("http://localhost:8000/auth/profile", {
  //       withCredentials: true,
  //     });
  //     setImage(data.user.image);
  //   } catch (error) {
  //     alert.error(error);
  //     navigate("/queryhub");
  //   }
  // };
  // useEffect(() => {
  //   fetchUser();
  // }, []);
  // console.log(image);
  return (
    <>
      <nav className={`main-nav`}>
        <div className="navbar">
          <button
            className="slide-in-icon"
            onClick={() => {
              handleSlideIn();
            }}>
            <FaBars />
          </button>
          <Link to="/queryhub" className="nav-item nav-logo">
            <img src={Logo} alt="logo" />
            <span className="queryhub-logo-1">Query</span>
            <span className="queryhub-logo-2">Hub</span>
          </Link>
          <div className={handler ? "navbar-1" : "navbar-1-1"}>
            <Link
              to="/queryhub/about"
              className="nav-items nav-item nav-btn res-nav">
              About
            </Link>
            <Link
              className="nav-item nav-items nav-btn res-nav"
              onClick={() => setIsOpen((prev) => !prev)}>
              Chatbot
            </Link>
            <Link
              to="/queryhub/products"
              className="nav-items nav-item nav-btn res-nav">
              Products
            </Link>
            <Link
              to="/queryhub/home"
              className="nav-items nav-item nav-btn res-nav">
              Home
            </Link>
            <Link
              to="/queryhub/questions"
              className="nav-items nav-item nav-btn res-nav">
              Questions
            </Link>
            <Link
              to="/queryhub/users"
              className="nav-items nav-item nav-btn res-nav">
              Users
            </Link>
          </div>
          <div className={`navbar-2`}>
            {image === "" ? (
              <Link to="/queryhub/login" className="nav-item nav-links ">
                Log in
              </Link>
            ) : (
              <>
                <img
                  src={image}
                  alt="image-icon"
                  style={{
                    height: "35px",
                    width: "35px",
                    cursor: "pointer",
                    borderRadius: "50%",
                  }}
                  onClick={() => {
                    navigate("/queryhub/profile");
                  }}
                />
                <button className="nav-item nav-links" onClick={handleLogout}>
                  Log out
                </button>
              </>
            )}
            <button className="nav-links ask-question">
              Ask Questions
              <FaArrowRight
                style={{
                  marginLeft: "2px",
                  color: "green",
                  marginTop: "4px",
                  fontSize: "0.9rem",
                }}
              />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
