import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
const Navbar = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const [image, setImage] = useState("");
  const Logo =
    "https://p7.hiclipart.com/preview/911/267/631/web-development-computer-icons-website.jpg";
  const [handler, setHandler] = useState(false);
  const handleSlideIn = () => {
    setHandler(!handler);
  };
  const { user, error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (user) {
      setImage(user.image);
    }
  }, [loading, isAuthenticated, error, user]);
  const handleLogout = () => {
    window.open("http://localhost:8000/auth/logout", "_self");
  };
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
            {isAuthenticated === false ? (
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
            <button
              onClick={() => navigate(`/queryhub/create/question`)}
              className="nav-links ask-question">
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
