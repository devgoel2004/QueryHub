import React, { useEffect, useState } from "react";
import Questions from "../Questions/Questions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getQuestions } from "../../actions/questionActions";
import { clearErrors } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
const HomeMainBar = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const { questions, loading, error, totalQuestions } = useSelector(
    (state) => state.questions
  );
  const getTags = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/tags`);
      //   console.log(data.tags);
      setTags(data.tags);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(getQuestions());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    getTags();
  }, [dispatch, alert, error]);
  return loading ? (
    <>
      <Loader />
    </>
  ) : (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}>
        <h1>Newest Questions</h1>
        <button
          className="ask-button"
          onClick={() => navigate(`/queryhub/create/questions`)}>
          Ask Questions
        </button>
      </div>
      <p>{totalQuestions} questions</p>
      <div className="filter">
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
      <h3>{questions.length}Questions</h3>
      <ul>
        {questions.map((question) => (
          <li>
            <h3>{question?.questionTitle}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeMainBar;
