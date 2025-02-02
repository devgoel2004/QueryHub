import React, { useState } from "react";
import "./ForgotPassword.css";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const forgotPasswordSubmit = () => {
    console.log(email);
    console.log("mail sent");
  };
  return (
    <div className="forgot-password">
      <form action="" onSubmit={forgotPasswordSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="submit" value="Send Email" className="button" />
      </form>
    </div>
  );
};

export default ForgotPassword;
