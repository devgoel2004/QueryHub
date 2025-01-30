import React from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";
const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="error">
      <div className="error-page">
        <div className="error-content">404 Page not Found</div>
        <button
          className="button"
          onClick={() => {
            navigate("/queryhub");
          }}>
          Home
        </button>
      </div>
    </div>
  );
};

export default Error;
