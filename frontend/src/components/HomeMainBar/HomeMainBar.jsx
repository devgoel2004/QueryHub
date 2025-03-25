import React from "react";
import Questions from "../Questions/Questions";
import "./HomeMainBar.css";
const HomeMainBar = () => {
  return (
    <div>
      <Questions limit={2} />
    </div>
  );
};

export default HomeMainBar;
