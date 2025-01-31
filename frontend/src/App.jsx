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
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
