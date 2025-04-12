import React, { useState } from "react";
import "./ForgotPassword.css";
import { clearErrors, forgotPasswordAction } from "../../actions/userActions";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
const ForgotPassword = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  // const selector = useSelector();
  const [email, setEmail] = useState("");
  const forgotPasswordSubmit = (e) => {
    try {
      e.preventDefault();
      console.log(email);
      dispatch(forgotPasswordAction(email));
      console.log("mail sent");
    } catch (error) {
      alert.error(error);
    }
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
