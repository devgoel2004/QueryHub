import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import Error from "./components/Error/Error";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import UpdateProfile from "./components/Profile/UpdateProfile";
import UpdatePassword from "./components/Profile/UpdatePassword";
import Questions from "./components/Questions/Questions";
import QuestionDetails from "./components/QuestionDetails/QuestionDetails";
import store from "./store";
import { loadUser } from "./actions/userActions";
import AskQuestion from "./components/AskQuestion/AskQuestion";
import UserDetails from "./components/UserDetails/UserDetails";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/queryhub/login" element={<Login />} />
        <Route exact path="/queryhub/signup" element={<Signup />} />
        <Route exact path="/queryhub" element={<Home />} />
        <Route exact path="/queryhub/profile" element={<Profile />} />
        <Route
          exact
          path="/queryhub/password/forgot"
          element={<ForgotPassword />}
        />
        <Route
          exact
          path="/queryhub/profile/update"
          element={<UpdateProfile />}
        />
        <Route
          exact
          path="/queryhub/update/password"
          element={<UpdatePassword />}
        />
        <Route path="/queryhub/questions" element={<Questions />} />
        <Route
          exact
          path="/queryhub/question/:id"
          element={<QuestionDetails />}></Route>
        <Route
          exact
          path={`/queryhub/create/question`}
          element={<AskQuestion />}
        />
        <Route path="*" element={<Error></Error>} />
        <Route exact path={`queryhub/user/:id`} element={<UserDetails />} />
      </Routes>
    </>
  );
}

export default App;
