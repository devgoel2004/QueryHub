import axios from "axios";
import {
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAIL,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL,
} from "../constants/otpConstants";
export const sendOTP = (email) => async (dispatch) => {
  try {
    dispatch({
      type: SEND_OTP_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    console.log("hello world");
    const { data } = await axios.post(
      `http://localhost:8000/user/generate-otp`,
      { email },
      config
    );
    console.log(data);
    dispatch({
      type: SEND_OTP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SEND_OTP_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const verifyOTP = (email, otp) => async (dispatch) => {
  try {
    dispatch({
      type: VERIFY_OTP_REQUEST,
    });
    const { data } = await axios.post(`http://localhost:8000/user/verify-otp`, {
      email,
      otp,
    });
    dispatch({
      type: VERIFY_OTP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VERIFY_OTP_FAIL,
      payload: error.response.data.message,
    });
  }
};
