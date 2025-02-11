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
  UPDATE_QUESTION_RESET,
  UPDATE_QUESTION_SUCCESS,
  UPDATE_QUESTION_FAIL,
  DELETE_QUESTION_RESET,
  DELETE_ANSWER_REQUEST,
  DELETE_ANSWER_SUCCESS,
  DELETE_ANSWER_FAIL,
  VOTE_QUESTION_REQUEST,
  VOTE_QUESTION_SUCCESS,
  VOTE_QUESTION_FAIL,
  CLEAR_ERRORS,
} from "../constants/questionConstants";
export const questionsReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case GET_QUESTIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_QUESTIONS_SUCCESS:
      return {
        state,
        loading: false,
        questions: action.payload,
      };
    case GET_QUESTIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const questionDetailsReducer = (state = { question: {} }, action) => {
  switch (action.type) {
    case GET_QUESTIONS_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_QUESTIONS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        question: action.payload,
      };
    case GET_QUESTIONS_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const questionCrudReducer = (state = {}, action) => {
  switch (action.type) {
    case ASK_QUESTION_REQUEST:
    case UPDATE_QUESTION_REQUEST:
    case DELETE_QUESTION_REQUEST:
    case POST_ANSWER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ASK_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        question: action.payload,
      };
    case UPDATE_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case POST_ANSWER_SUCCESS:
      return {
        ...state,
        loading: false,
        answerAdded: action.payload,
      };
    case ASK_QUESTION_FAIL:
    case UPDATE_QUESTION_FAIL:
    case DELETE_QUESTION_FAIL:
    case POST_ANSWER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_QUESTION_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_QUESTION_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
