import {
  SEND_OTP_FAIL,
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  VERIFY_OTP_FAIL,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_REQUEST,
} from "../constants/otpConstants";
const initialState = {
  loading: false,
  message: "",
  error: "",
};
export const otpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_OTP_REQUEST:
    case VERIFY_OTP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEND_OTP_SUCCESS:
    case VERIFY_OTP_SUCCESS:
      return {
        message: action.payload,
        loading: false,
        error: "",
      };
    case SEND_OTP_FAIL:
    case VERIFY_OTP_FAIL:
      return {
        loading: false,
        message: "",
        error: action.payload,
      };
    default:
      return state;
  }
};
