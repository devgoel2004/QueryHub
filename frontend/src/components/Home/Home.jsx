import React from "react";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import HomeMainBar from "../HomeMainBar/HomeMainBar";
import RightSideBar from "../RightSideBar/RightSideBar";
import "./Home.css";
const Home = () => {
  return (
    <div className="main">
      <div className="main-1">
        <LeftSideBar />
      </div>
      <div className="main-2">
        <HomeMainBar />
      </div>
      <div className="main-3">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
