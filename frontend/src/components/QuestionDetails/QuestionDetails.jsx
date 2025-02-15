import React, { useEffect, useState, useSyncExternalStore } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  deleteAnswer,
  getQuestion,
  postAnswer,
} from "../../actions/questionActions";
import { useDispatch, useSelector } from "react-redux";
import "./QuestionDetails.css";
import Loader from "../Loader/Loader";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import MetaData from "../MetaData/MetaData";
import { FaTrashAlt } from "react-icons/fa";
import { deleteQuestion } from "../../actions/questionActions";
import { clearErrors } from "../../actions/userActions";

const QuestionDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const {
    question,
    loading,
    error: questionDetailError,
  } = useSelector((state) => state.questionDetails);
  const temp = useSelector((state) => state.questionCrud);
  const x = useSelector((state) => state.questionDetails);
  // console.log(error);
  console.log(questionDetailError);
  console.log(temp);
  const alert = useAlert();
  const [answerBody, setAnswerBody] = useState("");
  const postAnswerHandler = (e) => {
    e.preventDefault();
    dispatch(postAnswer(answerBody, id));
    alert.success("Answer posted successfully");
  };
  const deleteAnswerHandler = (ansId) => {
    dispatch(deleteAnswer(id, ansId));
    alert.success("Deleted successfully");
  };
  const deleteQuestionHandler = () => {
    console.log("delete");
    if (!isAuthenticated) {
      alert.error("User not authenticated");
      return;
    } else {
      dispatch(deleteQuestion(id));
      alert.success("Deleted successfully");
    }
  };
  useEffect(() => {
    if (x.error) {
      alert.error(x.error);
      dispatch(clearErrors());
      navigate(`/queryhub/questions`);
    }
    if (questionDetailError) {
      alert.error(questionDetailError);
      navigate(`/queryhub/questions`);
    }
    dispatch(getQuestion(id));
  }, [dispatch, id, x.error,questionDetailError]); // This runs only when `id` changes

  return (
    <>
      {loading ? (
        <>
          <MetaData title="Question Details" />
          <Loader />
        </>
      ) : (
        <>
          <MetaData title={question.question.questionTitle} />
          <div className="question-container">
            <h1 className="question-title">
              {question && question?.question?.questionTitle}
            </h1>
            <p className="question-body">{question?.question?.questionBody}</p>
            {/* Date & User Info */}
            <div className="question-meta">
              <p>
                Date:{" "}
                {question &&
                  new Date(question?.question?.postedOn).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
              </p>
              <p>User Name: {question?.question?.userName}</p>
            </div>
            {/* Tags */}
            <div className="question-tags">
              {question?.question?.questionTags?.map((tag, index) => (
                <span key={index} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
            {/* Answers Section */}
            <h3 className="answers-title">
              {question?.question?.answer?.length} Answers
            </h3>
            <ol
              style={{
                listStyleType: "none",
              }}>
              {question?.question?.answer.map((ans) => (
                <li key={ans._id}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                    }}>
                    <p
                      style={{
                        fontWeight: "400",
                      }}>
                      Answer: {ans.answerBody}
                    </p>
                    <button
                      className="delete-button"
                      onClick={() => deleteAnswerHandler(ans._id)}>
                      <FaTrashAlt></FaTrashAlt>
                    </button>
                  </div>
                  <p
                    style={{
                      fontWeight: "200",
                    }}>
                    Posted By: {ans.userAnswered}
                  </p>
                </li>
              ))}
            </ol>
            {question?.question?.upVote - question?.question?.downVote} Vote
            <button className="arrow up">
              <FaArrowUp />
            </button>
            <button className="arrow down">
              <FaArrowDown />
            </button>
            <br />
            <form action="" onSubmit={postAnswerHandler}>
              <textarea
                className="input"
                type="text"
                placeholder="Answer Body"
                onChange={(e) => setAnswerBody(e.target.value)}
              />
              <input type="file" className="input" placeholder="Image" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}>
                <button type="submit" className="button">
                  Post Answer
                </button>
              </div>
            </form>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}>
              <button onClick={deleteQuestionHandler} className="button">
                Delete Question
              </button>
            </div>
          </div>
        </>
        // <></>
      )}
    </>
  );
};

export default QuestionDetails;
