import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors, getUserDetails } from "../../actions/userActions";
import Loader from "../Loader/Loader";
import "./UserDetails.css"; // ✅ Import CSS file

const UserDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { id } = useParams();
  const { loading, user, error } = useSelector((state) => state.userDetails);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getUserDetails(id));
  }, [dispatch, error, id]); // ✅ Add `id` to dependency array

  return loading ? (
    <Loader />
  ) : (
    <div
      style={{
        marginTop: "60px",
        display: "flex",
        minHeight: "90vh",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div className="user-details-container">
        <img src={user?.user?.image} alt="User" className="user-image" />
        <h1>User Details</h1>
        <h4>User: {user?.user?.name}</h4>
        <h4>Email: {user?.user?.email}</h4>
        <p>Date: {user?.user?.joinedOn}</p>
        <button
          onClick={() => navigate(`/queryhub/message/${user.user._id}`)}
          className="user-message-button">
          Message
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
