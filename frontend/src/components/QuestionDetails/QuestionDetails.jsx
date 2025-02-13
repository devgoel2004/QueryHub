import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { getQuestion } from "../../actions/questionActions";
import { useDispatch, useSelector } from "react-redux";
import "./QuestionDetails.css";
import Loader from "../Loader/Loader";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
const QuestionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { question, loading, error } = useSelector(
    (state) => state.questionDetails
  );
  console.log(loading);
  const alert = useAlert();
  const [value, setValue] = useState(0);
  const [count, setCount] = useState(0);
  const [answerBody, setAnswerBody] = useState("");
  useEffect(() => {
    if (error) {
      console.log(error);
      alert.success(error);
    }
    dispatch(getQuestion(id));
  }, [dispatch, id]);
  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="question-container">
            <h1 className="question-title">
              {question && question.question.questionTitle}
            </h1>
            <p className="question-body">
              {question && question.question.questionBody}
            </p>
            {/* Date & User Info */}
            <div className="question-meta">
              <p>
                Date:{" "}
                {question &&
                  new Date(question.question.postedOn).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
              </p>
              <p>User ID: {question && question.question.user}</p>
            </div>
            {/* Tags */}
            <div className="question-tags">
              {question &&
                question.question.questionTags.map((tag, index) => (
                  <span key={index} className="tag">
                    #{tag}
                  </span>
                ))}
            </div>
            {/* Answers Section */}
            <h3 className="answers-title">
              {question && question.question.answer.length} Answers
            </h3>
            <ul>
            {question &&
              question.question.answer.map((ans) => (
                <li>
                  <p>{ans.answerBody}</p>
                </li>
              ))}
              </ul>
            {question.question.upVote - question.question.downVote} Vote
            <button className="arrow up">
              <FaArrowUp />
            </button>
            <button className="arrow down">
              <FaArrowDown />
            </button>
            <br />
            {/* <form action="">
            <textarea
              className="input"
              type="text"
              onChange={(e) => setAnswerBody(e.target.value)}
            />
            <img src="" alt="" />
          </form> */}
            <button className="button">Post Answer</button>
          </div>
        </>
      )}
    </>
  );
};

export default QuestionDetails;
