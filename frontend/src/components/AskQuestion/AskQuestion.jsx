import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "./AskQuestion.css";
import MetaData from "../MetaData/MetaData";
import Loader from "../Loader/Loader";
import { MdOutlineCancel } from "react-icons/md";
import { createQuestion } from "../../actions/questionActions";
import { useNavigate } from "react-router-dom";
import { clearErrors } from "../../actions/userActions";
const AskQuestion = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { loading, success, question, error } = useSelector(
    (state) => state.questionCrud
  );
  const postQuestionHandler = (e) => {
    e.preventDefault();
    const questionData = {
      questionTitle,
      questionBody,
      questionTags,
    };
    dispatch(createQuestion(questionData));
    if (question.success) {
      alert.success("Question added successfully");
      navigate(`/queryhub/questions`);
    }
    setQuestionBody("");
    setQuestionTitle("");
    setQuestionTags([]);
  };
  const [tag, setTag] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState([]);
  const addQuestionTags = (e) => {
    e.preventDefault();
    if (tag.trim() !== "") {
      const newTags = tag.split(" ").filter((t) => t.trim() !== "");
      setQuestionTags((prevTags) => [...prevTags, ...newTags]);
      setTag("");
    }
  };
  const deleteTag = (tagToRemove) => {
    setQuestionTags(questionTags.filter((tag) => tag !== tagToRemove));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    const timeOut = setTimeout(() => {
      if (!isAuthenticated) {
        alert.error("Login to ask question");
        navigate(`/queryhub/login`);
      }
    }, 2000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [isAuthenticated, error, success, alert, navigate, dispatch]);
  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="postQuestion">
            <MetaData title="Ask Question" />
            <h1>Ask Question</h1>
            <form
              action=""
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <input
                className="input box"
                type="text"
                placeholder="Question Title"
                onChange={(e) => setQuestionTitle(e.target.value)}
              />
              <input
                className="input box"
                type="text"
                placeholder="Question Body"
                onChange={(e) => setQuestionBody(e.target.value)}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "wrap",
                  justifyContent: "space-around",
                  minWidth: "90%",
                }}>
                <input
                  className="input box"
                  style={{
                    minWidth: "70vw",
                  }}
                  onChange={(e) => setTag(e.target.value)}
                  type="text"
                  placeholder="Question Tags"
                />
                <button onClick={addQuestionTags} className="Add-button">
                  Add
                </button>
              </div>
              <ul
                style={{
                  listStyleType: "none",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}>
                {questionTags.map((tag) => (
                  <li
                    style={{
                      listStyle: "none",
                      background: "#007bff",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "15px",
                      fontSize: "0.8rem",
                      margin: "8px 15px",
                    }}>
                    #{tag}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        deleteTag(tag);
                      }}
                      style={{
                        marginLeft: "10px",
                        border: "none",
                        width: "10px",
                        color: "white",
                        backgroundColor: "#007bff",
                      }}>
                      <MdOutlineCancel />
                    </button>
                  </li>
                ))}
              </ul>
              <input
                type="submit"
                value={"Ask Question"}
                onClick={postQuestionHandler}
                className="button"
              />
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default AskQuestion;
