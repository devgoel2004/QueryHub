import React from "react";
import { useParams, useNavigate } from "react-router-dom";
const QuestionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  return <div>QuestionDetails</div>;
};

export default QuestionDetails;
