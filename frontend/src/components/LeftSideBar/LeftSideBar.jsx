import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LeftSideBar.css"; // Import CSS file
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearErrors } from "../../actions/userActions";
const LeftSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [image, setImage] = useState(
    "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
  );

  useEffect(() => {}, [alert, navigate]);
  return (
    <div className="sidebar">
      {/* Profile Section */}
      <div className="profile-section">
        <img src={image} alt="Profile" className="profile-img" />
        <h3 className="profile-name">Name</h3>
        <span className="profile-badge">Badge</span>
      </div>
      {/* Navigation Menu */}
      <ul className="nav-menu">
        {[
          { to: "/queryhub/trending", label: "Trending" },
          { to: "/queryhub/saved", label: "Saved Questions" },
          { to: "/queryhub/my-questions", label: "My Questions" },
          { to: "/queryhub/my-answers", label: "My Answers" },
          { to: "/queryhub/leaderboard", label: "Leaderboard" },
          { to: "/queryhub/tags", label: "Explore Tags" },
          { to: "/queryhub/settings", label: "Settings" },
        ].map((item, index) => (
          <li key={index}>
            <Link to={item.to} className="nav-link">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftSideBar;
