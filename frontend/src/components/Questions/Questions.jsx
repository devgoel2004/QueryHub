import React, { useState, useEffect } from "react";
import "./Question.css";
import { FaAffiliatetheme, FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import MetaData from "../MetaData/MetaData";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { getQuestions } from "../../actions/questionActions";
import { useAlert } from "react-alert";
import axios from "axios";
const Questions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [tags, setTags] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { loading, questions, error, totalPages, totalQuestions } = useSelector(
    (state) => state.questions
  );
  const upVoteHandler = () => {
    setValue(1);
  };
  const downVoteHandler = () => {
    setValue(-1);
  };
  const getTags = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/tags`);
      setTags(data.tags);
    } catch (error) {
      alert.error(error.response.data.message || "Something went wrong");
    }
  };
  const searchHandler = () => {
    setSearchValue(search);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
    
    }
    dispatch(getQuestions(searchValue, tag, sortBy, order, page));
    getTags();
  }, [dispatch, alert, error, searchValue, tag, sortBy, order, page]);
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
          {totalQuestions} questions
        </p>
        <div className="filter">
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            className="input"
            style={{
              width: "40vw",
              backgroundColor: "white",
              border: "1px solid black",
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchHandler}>Search</button>
          <select value={tag} onChange={(e) => setTag(e.target.value)}>
            <option value="">All Tags</option>
            {tags.map((tag) => (
              <option value={tag}>{tag}</option>
            ))}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="createdAt">Date</option>
            <option value="Vote">Votes</option>
          </select>
          <select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
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
                <p onClick={() => navigate(`/queryhub/user/${question.user}`)}>
                  User:{" "}
                  <span
                    style={{
                      color: "#007bff",
                    }}>
                    {" "}
                    {question.userName}
                  </span>
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
