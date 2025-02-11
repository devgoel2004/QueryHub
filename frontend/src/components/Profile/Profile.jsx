import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import "./Profile.css";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";

const Profile = () => {
  const navigate = useNavigate();
  const { user, error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const alert = useAlert();
  const updateNavigate = () => {
    navigate("/queryhub/profile/update");
  };
  useEffect(() => {
    if (error) {
      alert.error("Something went wrong");
      console.log(error);
    }
    const timeOut = setTimeout(() => {
      if (!isAuthenticated) {
        alert.error("Login to access this resource");
        navigate(`/queryhub/login`);
      }
    }, 2000);
    return () => clearTimeout(timeOut);
  }, [isAuthenticated, loading, user, alert, navigate]);
  const handleLogout = () => {
    window.open("http://localhost:8000/auth/logout", "_self");
  };
  return (
    <div className="profile">
      {user ? (
        <>
          <div style={{ textAlign: "center" }}>
            <h2>Welcome {user.name}</h2>
            <img
              src={user.image}
              alt="Profile"
              style={{ alignContent: "center" }}
            />
            {user.phone ? (
              <>
                <p>Phone: {user.phone}</p>
              </>
            ) : (
              <></>
            )}
            {user.about ? (
              <>
                <p>About:{user.about}</p>
              </>
            ) : (
              <></>
            )}
            <p>
              {user.tags ? (
                <>
                  <p>{user.tags}</p>
                </>
              ) : (
                <></>
              )}
            </p>
            <p>Email: {user.email}</p>
            <p>
              Badge: <span className={`${user.badge}`}>{user.badge}</span>
            </p>
            <p>Date: {user.joinedOn}</p>
            <button className="button" onClick={handleLogout}>
              Logout
            </button>
            <br />
            <br />
            <button className="button" onClick={updateNavigate}>
              UPDATE PROFILE
            </button>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Profile;
