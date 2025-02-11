import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../actions/userActions";
import { useAlert } from "react-alert";
import { FaDirections } from "react-icons/fa";
const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState();
  const [about, setAbout] = useState("");
  const updateProfileSubmit = (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
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
  };
  const { user, isAuthenticated, isloading, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
      setAbout(user.about);
      setPhone(user.phone);
      setImage(user.image);
      // setImage(user.image);
    }
    if (!isAuthenticated) {
      console.log("error");
    }
  }, [isAuthenticated, user]);
  return (
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
        <input type="submit" className="button" />
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
