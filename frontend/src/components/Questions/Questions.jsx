import React, { useState, useEffect } from "react";
import "./Question.css";
import axios from "axios";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import MetaData from "../MetaData/MetaData";
import { useNavigate } from "react-router-dom";
const Questions = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [value, setValue] = useState(0);
  const [count, setCount] = useState(0);
  const getQuestions = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/question`);
      setQuestions(data.questions);
      setCount(data.questions.length);
      console.log(data.questions);
      console.log(questions[0].upVote - questions[0].downVote);
    } catch (error) {
      console.log(error);
    }
  };
  const upVoteHandler = () => {
    setValue(1);
    console.log(value);
  };
  const downVoteHandler = () => {
    setValue(-1);
  };
  useEffect(() => {
    getQuestions();
  }, []);
  return (
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
                    <li>{tag}</li>
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
                    <>question.answer.length</>
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
