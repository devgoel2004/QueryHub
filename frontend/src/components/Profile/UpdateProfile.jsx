import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateProfile } from "../../actions/userActions";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import { MdAutoDelete } from "react-icons/md";
const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const { isUpdated, error: profileError } = useSelector(
    (state) => state.profile
  );
  const x = useSelector((state) => state.profile);
  const [email, setEmail] = useState(user?.email);
  const [name, setName] = useState(user?.name);
  const [image, setImage] = useState(user?.image);
  const [phone, setPhone] = useState(user?.phone);
  const [about, setAbout] = useState(user?.about);
  const updateProfileSubmit = (e) => {
    e.preventDefault();
    if (String(phone).length !== 10) {
      alert.error("Phone number should be of 10");
      return;
    }
    const userData = {
      name,
      email,
      image,
      phone,
      about,
    };
    dispatch(updateProfile(userData));
    if (isUpdated) {
      alert.success("Updated successfully");
    }
  };

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
      setAbout(user.about);
      setPhone(user.phone);
      setImage(user.image);
    }

    const timeOut = setTimeout(() => {
      if (!isAuthenticated) {
        alert.error("Login to access this resource");
        navigate(`/queryhub/login`);
      }
    }, 2000);
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (x.error) {
      alert.error(x.error);
      dispatch(clearErrors());
    }
    return () => {
      clearInterval(timeOut);
    };
  }, [isAuthenticated, user, error, alert, isUpdated, x.error]);
  return loading ? (
    <>
      <Loader />
    </>
  ) : (
    <div
      className="update-profile"
      style={{
        display: "flex",
        flexDirection: "column",
      }}>
      <form
        action="
      "
        className="form"
        onSubmit={updateProfileSubmit}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <img
          src={image}
          alt=""
          style={{
            width: "50px",
            height: "50px",
          }}
        />
        <input
          type="file"
          placeholder="Image"
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="number"
          value={phone}
          placeholder="Mobile No"
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="about"
          value={about}
          placeholder="About"
          onChange={(e) => e.target.value}
        />
        <input type="submit" className="button" value="UPDATE PROFILE" />
      </form>
      <button
        className="button"
        onClick={() => navigate("/queryhub/update/password")}>
        UPDATE PASSWORD
      </button>
    </div>
  );
};

export default UpdateProfile;
