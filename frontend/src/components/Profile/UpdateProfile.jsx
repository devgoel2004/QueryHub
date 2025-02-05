import React, { useState } from "react";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";
const UpdateProfile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState();
  const [about, setAbout] = useState("");
  const updateProfileSubmit = () => {};
  return (
    <div className="update-profile">
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
        <input
          type="file"
          value={image}
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
        <button
          className="button"
          onClick={() => navigate("/queryhub/update/password")}>
          UPDATE PASSWORD
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
