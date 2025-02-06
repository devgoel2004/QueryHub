import React, { useState } from "react";
import "./PostQuestion.css";
import MetaData from "../MetaData/MetaData";
const PostQuestion = () => {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const addTags = (e) => {
    e.preventDefault();
    setTags([...tags, tag]);
  };
  return (
    <>
      <MetaData title={"Create Question"} />
      <div
        style={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "70px",
          // justifyContent: "center",
        }}>
        <h1>Create Question</h1>
        <form action="" className="form">
          <input type="text" placeholder="Question Title" />
          <textarea type="text" placeholder="Question Body" className="input" />
          <div>
            <input
              type="text"
              placeholder="Question Tags"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <button
              style={{
                backgroundColor: "tomato",
                padding: "10px 10px",
                border: "none",
                color: "white",
                fontWeight: "500",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={addTags}>
              Add
            </button>
            <ul className="tag-list">
              {tags.map((tag, index) => (
                <li key={index} className="tag-list-item">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <input type="submit" className="button" />
        </form>
      </div>
    </>
  );
};

export default PostQuestion;
