import React, { useState, useEffect } from "react";
import "./Question.css";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import MetaData from "../MetaData/MetaData";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { getQuestions } from "../../actions/questionActions";
import { useAlert } from "react-alert";
const Questions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [value, setValue] = useState(0);
  const { loading, questions, error } = useSelector((state) => state.questions);
  const upVoteHandler = () => {
    setValue(1);
  };
  const downVoteHandler = () => {
    setValue(-1);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      navigate(`/queryhub`);
    }
    dispatch(getQuestions());
  }, [dispatch, alert, error]);
  return loading ? (
    <>
      <Loader />
    </>
  ) : (
    <>
      <MetaData title={"Questions"} />
      <div
        style={{
          marginTop: "75px",
        }}
        className="question-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}>
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: "600",
            }}>
            Newest Questions
          </h1>
          <button
            onClick={() => navigate("/queryhub/create/question")}
            className="ask-button">
            Ask Question
          </button>
        </div>
        <p
          style={{
            fontWeight: "400",
            paddingLeft: "20px",
          }}>
          {questions.length} questions
        </p>
        <div className="filter">
          <span>Newest</span>
          <span>Vote</span>
          <span>Answer</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <ul className="question-list">
            {questions.map((question) => (
              <li className="list-item" key={question._id}>
                <h1>{question.questionTitle}</h1>
                <p>{question.questionBody}</p>
                <ul
                  style={{
                    padding: "10px 5px",
                  }}>
                  {question.questionTags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <button className="button-tags" onClick={upVoteHandler}>
                  <FaArrowAltCircleUp
                    style={{ color: "green", fontSize: "1.3rem" }}
                  />
                </button>
                <button className="button-tags" onClick={downVoteHandler}>
                  <FaArrowCircleDown
                    style={{ color: "red", fontSize: "1.3rem" }}
                  />
                </button>
                {question.upVote - question.downVote > 0 ? (
                  <div style={{ color: "green" }}>
                    <p>{question.upVote - question.downVote}</p>{" "}
                  </div>
                ) : (
                  <>
                    <p style={{ color: "red" }}>
                      {question.upVote - question.downVote} Vote
                    </p>{" "}
                  </>
                )}
                <p>
                  {question.answer.length === 0 ? (
                    <>No </>
                  ) : (
                    <>{question.answer.length} </>
                  )}
                  Answers
                </p>
                <button
                  style={{
                    minWidth: "50%",
                  }}
                  onClick={() => navigate(`/queryhub/question/${question._id}`)}
                  className="button">
                  Details
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Questions;
