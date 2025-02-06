import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import Error from "./components/Error/Error";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import UpdateProfile from "./components/Profile/UpdateProfile";
import UpdatePassword from "./components/Profile/UpdatePassword";
import PostQuestion from "./components/PostQuestion/PostQuestion";
import Questions from "./components/Questions/Questions";
import QuestionDetails from "./components/QuestionDetails/QuestionDetails";
function App() {
  // const [user, setUser] = useState(null);
  // const getUser = async () => {
  //   try {
  //     const url = `http://localhost:8000/auth/login/success`;
  //     const { data } = await axios.get(url, { withCredentials: true });
  //     setUser(data.user._json);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getUser();
  // }, []);
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
          path="/queryhub/password/update"
          element={<UpdatePassword />}
        />
        <Route
          exact
          path="/queryhub/question/create"
          element={<PostQuestion />}></Route>
        <Route path="/queryhub/questions" element={<Questions />} />
        <Route
          exact
          path="/queryhub/question/:id"
          element={<QuestionDetails />}></Route>
        <Route path="*" element={<Error></Error>} />
      </Routes>
    </>
  );
}

export default App;
