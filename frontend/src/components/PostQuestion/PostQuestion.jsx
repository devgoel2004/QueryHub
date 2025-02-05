import React from "react";
import "./PostQuestion.css";
const PostQuestion = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <h1>Create Question</h1>

      <form
        action=""
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          minWidth: "50vw",
        }}>
        <input type="text" placeholder="Question Title" />
        <textarea type="text" placeholder="Question Body" />
        <input type="text" placeholder="Question Tags" />
      </form>
    </div>
  );
};

export default PostQuestion;
