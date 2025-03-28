import React, { useState, useEffect } from "react";
import Questions from "../Questions/Questions";
import MetaData from "../MetaData/MetaData";
import "./HomeMainBar.css";
import { FaArrowCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { getQuestions } from "../../actions/questionActions";
import axios from "axios";
import { clearErrors } from "../../actions/userActions";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
const HomeMainBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const itemsPerPage = 2;
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
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };
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
      alert.error(error || "Something went wrong");
      dispatch(clearErrors());
    }
    dispatch(getQuestions(searchValue, tag, sortBy, order, page, itemsPerPage));
    getTags();
  }, [
    dispatch,
    alert,
    error,
    searchValue,
    tag,
    sortBy,
    order,
    page,
    itemsPerPage,
  ]);
  return (
    <div>
      <>
        <MetaData title={"QUERYHUB || HOME"} />
        <div className="questions-container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}>
            <h1 className="newest">Top Questions</h1>
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
            <div className="searchBox">
              <input
                placeholder="....search"
                type="search"
                name="search"
                pattern=".*\S.*"
                className="inputBox"
                required
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="search-button"
                type="submit"
                onClick={searchHandler}>
                <FaMagnifyingGlass />
              </button>
            </div>
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
                  <p
                    onClick={() => navigate(`/queryhub/user/${question.user}`)}>
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
                    onClick={() =>
                      navigate(`/queryhub/question/${question._id}`)
                    }
                    className="button">
                    Details
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {totalPages > 1 && (
            <div className="pagination-container">
              <Pagination
                activePage={page}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={totalQuestions}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default HomeMainBar;
