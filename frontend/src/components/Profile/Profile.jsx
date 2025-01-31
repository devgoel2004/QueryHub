import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
const Profile = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const alert = useAlert();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/auth/profile", {
          withCredentials: true,
        });
        setUser(data.user);
      } catch (error) {
        alert.error(error);
        console.error("Error fetching user:", error);
        navigate("/");
      }
    };
    fetchUser();
  }, []);
  const handleLogout = () => {
    window.open("http://localhost:8000/logout", "_self");
  };
  return (
    <div>
      {user ? (
        <>
          <h2>Welcome {user.name}</h2>
          <img src={user.image} alt="Profile" />
          <p>Email: {user.email}</p>
          <p>Badge: {user.badge}</p>
          <p>Date: {user.joinedOn}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </div>
  );
};

export default Profile;
