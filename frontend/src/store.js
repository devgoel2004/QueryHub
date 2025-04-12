import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  forgotPasswordReducer,
  updateReducer,
  userDetailsReducer,
  userReducer,
  profileReducer,
} from "./reducers/usersReducer";
import { otpReducer } from "./reducers/otpReducers";
import {
  questionsReducer,
  questionDetailsReducer,
  questionCrudReducer,
} from "./reducers/questionReducer";

const reducer = combineReducers({
  user: userReducer,
  userDetails: userDetailsReducer,
  updateUser: updateReducer,
  forgotPassword: forgotPasswordReducer,
  profile: profileReducer,
  questions: questionsReducer,
  questionDetails: questionDetailsReducer,
  questionCrud: questionCrudReducer,
  otp: otpReducer,
});
let initialState = {};

const middleWare = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);
export default store;
