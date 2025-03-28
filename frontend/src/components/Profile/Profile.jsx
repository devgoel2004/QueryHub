import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import "./Profile.css";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearErrors } from "../../actions/userActions";
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(false);
  const { user, error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const alert = useAlert();
  const updateNavigate = () => {
    navigate("/queryhub/profile/update");
  };
  const sendOTP = (email) => {
    console.log(email);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      return;
    }
    const timeOut = setTimeout(() => {
      if (!isAuthenticated) {
        alert.error("Login to access this resource");
        navigate(`/queryhub/login`);
        return;
      }
    }, 2000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [isAuthenticated, loading, user, alert, navigate, error]);
  const handleLogout = () => {
    window.open("http://localhost:8000/auth/logout", "_self");
  };
  return loading ? (
    <>
      <Loader />
    </>
  ) : (
    <>
      <div className="profile">
        {user ? (
          <>
            <div style={{ textAlign: "center" }}>
              <h2>Welcome {user?.name}</h2>
              <img
                src={user?.image}
                alt="Profile"
                style={{ alignContent: "center" }}
              />
              <p>Phone: {user?.phone}</p>
              <p>About:{user?.about}</p>
              <p>{user?.tags}</p>
              <p>
                Email: {user?.email}
                {` `}
                <span>
                  {isVerified ? (
                    <span className="green"> verified</span>
                  ) : (
                    <span className="red">not verified</span>
                  )}
                </span>
              </p>
              <button onClick={sendOTP(user.email)}>Verify</button>
              <p>
                Badge: <span className={`${user?.badge}`}>{user?.badge}</span>
              </p>
              <p>Date: {user?.joinedOn}</p>
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
    </>
  );
};

export default Profile;
