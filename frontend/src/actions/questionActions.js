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
//GET QUESTIONS
export const getQuestions =
  (search = "", tag = "", sortBy = "createdAt", order = "desc", page = 1) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_QUESTIONS_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.get(
        `http://localhost:8000/question`,
        { params: { search, tag, sortBy, order, page } },
        config
      );
      dispatch({
        type: GET_QUESTIONS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_QUESTIONS_FAIL,
        payload: error?.response?.data?.message || "Something went wrong",
      });
    }
  };
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

    dispatch({
      type: ASK_QUESTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ASK_QUESTION_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getQuestion = (questionId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_QUESTIONS_DETAILS_REQUEST,
    });
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
    dispatch({
      type: GET_QUESTIONS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_QUESTIONS_DETAILS_FAIL,
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};
export const deleteQuestion = (questionId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_QUESTION_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.delete(
      `http://localhost:8000/question/${questionId}`,
      config
    );
    dispatch({
      type: DELETE_QUESTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_QUESTION_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const postAnswer = (answerBody, id) => async (dispatch) => {
  try {
    dispatch({
      type: POST_ANSWER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `http://localhost:8000/answer/post/${id}`,
      { answerBody },
      config
    );
    type({
      type: POST_ANSWER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_ANSWER_FAIL,
      payload: error.response,
    });
  }
};

export const deleteAnswer = (id, ansId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_ANSWER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.delete(
      `http://localhost:8000/answer/delete/${id}?answerId=${ansId}`,
      config
    );
    dispatch({
      type: DELETE_ANSWER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ANSWER_FAIL,
      payload: error.response,
    });
  }
};
