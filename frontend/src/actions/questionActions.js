import axios from "axios";
import {
  ASK_QUESTION_REQUEST,
  ASK_QUESTION_SUCCESS,
  ASK_QUESTION_FAIL,
  GET_QUESTIONS_REQUEST,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAIL,
  GET_QUESTIONS_DETAILS_REQUEST,
  GET_QUESTIONS_DETAILS_SUCCESS,
  GET_QUESTIONS_DETAILS_FAIL,
  POST_ANSWER_REQUEST,
  POST_ANSWER_SUCCESS,
  POST_ANSWER_FAIL,
  DELETE_QUESTION_REQUEST,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_FAIL,
  UPDATE_QUESTION_REQUEST,
  UPDATE_QUESTION_SUCCESS,
  UPDATE_QUESTION_FAIL,
  DELETE_ANSWER_REQUEST,
  DELETE_ANSWER_SUCCESS,
  DELETE_ANSWER_FAIL,
  VOTE_QUESTION_REQUEST,
  VOTE_QUESTION_SUCCESS,
  VOTE_QUESTION_FAIL,
  CLEAR_ERRORS,
} from "../constants/questionConstants";
//ASK QUESTION
export const createQuestion = (questionData) => async (dispatch) => {
  try {
    dispatch({
      type: ASK_QUESTION_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `http://localhost:8000/question`,
      questionData,
      config
    );
    console.log(data);
    dispatch({
      type: ASK_QUESTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ASK_QUESTION_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getQuestion = async (questionId) => {
  console.log("hello world");
  try {
    console.log(questionId);
    // dispatch({
    //   type: GET_QUESTIONS_DETAILS_REQUEST,
    // });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.get(
      `http://localhost:8000/question/${questionId}`,
      config
    );
    console.log(data);
    // dispatch({
    //   type: GET_QUESTIONS_DETAILS_SUCCESS,
    //   payload: data,
    // });
  } catch (error) {
    console.log(error);
    // dispatch({
    //   type: GET_QUESTIONS_DETAILS_FAIL,
    //   payload: error.response.data.message,
    // });
  }
};
