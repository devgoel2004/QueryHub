import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import "./Profile.css";
import { useAlert } from "react-alert";
const Profile = () => {
  const [user, setUser] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const alert = useAlert();
  const updateNavigate = () => {
    navigate("/queryhub/profile/update");
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/auth/profile", {
          withCredentials: true,
        });
        setUser(data.user);
        const timeStamp = data.user.joinedOn;
        const date = new Date(timeStamp);
        setDate(date.toLocaleDateString());
      } catch (error) {
        alert.error(error);
        navigate("/queryhub");
      }
    };
    fetchUser();
  }, [navigate, alert]);
  const handleLogout = () => {
    window.open("http://localhost:8000/logout", "_self");
  };
  return (
    <div className="profile">
      {user ? (
        <div style={{ textAlign: "center" }}>
          <h2>Welcome {user.name}</h2>
          <img
            src={user && user.image}
            alt="Profile"
            style={{ alignContent: "center" }}
          />
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
          <p>Date: {date}</p>
          <button className="button" onClick={handleLogout}>
            Logout
          </button>
          <br />
          <br />
          <button className="button" onClick={updateNavigate}>
            UPDATE PROFILE
          </button>
        </div>
      ) : (
        <>
          <Loader />
        </>
      )}
    </div>
  );
};

export default Profile;
