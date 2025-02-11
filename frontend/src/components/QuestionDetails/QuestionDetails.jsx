import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { getQuestion } from "../../actions/questionActions";
import { useDispatch, useSelector } from "react-redux";
const QuestionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const x = useSelector((state) => state.questionDetails);
  console.log(x);
  const alert = useAlert();
  const [value, setValue] = useState(0);
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState("");
  // console.log(id);
  // const getQuestionDetails = async () => {
  //   try {
  //     const { data } = await axios.get(`http://localhost:8000/question/${id}`);
  //     console.log(data);
  //     if (data.success === false) {
  //       alert.error(data.message);
  //     }
  //     setUserId(data.question.user);
  //     console.log("userId", userId);
  //     setQuestion(data.question);
  //     // getUserData(data.question.user);
  //   } catch (error) {
  //     alert.error("Something is wrong");
  //     console.log(error.response.data.success);
  //   }
  // };
  // const getUserData = async (userId) => {
  //   console.log(userId);
  //   const value = await axios.get(`http://localhost:8000/user/${userId}`);
  //   console.log(value);
  //   // try {
  //   //   console.log(userId);
  //   //   const { data } = await axios.get(`http://localhost:8000/user/${id}`);
  //   //   console.log(data);
  //   // } catch (error) {}
  // };
  // console.log(id);
  useEffect(() => {
    console.log(id);
    getQuestion(id);
  }, [id]);
  return (
    <>
      {/* <div>
        <h1>Question Detail</h1>
        <h2>{id}</h2>
        <h2>{question && question.questionTitle}</h2>
        <p>{question && question.questionBody}</p>
        <p>
          {question &&
            question.questionTags.map((tag) => (
              <ul>
                <li>{tag}</li>
              </ul>
            ))}
        </p>
      </div> */}
    </>
  );
};

export default QuestionDetails;
