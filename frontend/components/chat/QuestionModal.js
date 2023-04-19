import React, { useState } from "react";
import Modal from "react-modal";
import classes from "./Chat.module.css";
import { toast } from "react-toastify";

const QuestionModal = ({ questions, isOpen, onRequestClose, onSubmit }) => {
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);

  const handleSelectQuestion = (questionId, isSelected) => {
    if (isSelected) {
      if (selectedQuestionIds.length < 1) {
        setSelectedQuestionIds([...selectedQuestionIds, questionId]);
      } else {
        toast.warning("يمكنك اختيار سؤال واحد فقط في المرة الواحدة");
      }
    } else {
      setSelectedQuestionIds(
        selectedQuestionIds.filter((id) => id !== questionId)
      );
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.3)",
      width: "auto", // Set the width to auto
      height: "auto", // Set the height to auto
      maxWidth: "80vw", // Set a maximum width to prevent overflowing the screen
      maxHeight: "80vh", // Set a maximum height to prevent overflowing the screen
    },
  };

  const handleSubmit = () => {
    onSubmit(selectedQuestionIds);
    setSelectedQuestionIds([]);
  };

  return (
    <Modal
      className={classes["questions-modal"]}
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={onRequestClose}
    >
      <h2 className={classes["questionsModalTitle"]}>
        حدد السؤال الذي تريد ارساله للطرف الأخر
      </h2>
      <h2 className={classes["questionsModalHint"]}>سؤال واحد في كل مرة</h2>

      <div className={classes["questionsContainer"]}>
        <div className={classes["questionsListContainer"]}>
          <ul>
            {questions.map((question) => (
              <div key={question.id}>
                <input
                  type="checkbox"
                  id={`question${question.id}`}
                  className={classes["question-checkbox"]}
                  checked={selectedQuestionIds.includes(question.id)}
                  onChange={(e) => {
                    handleSelectQuestion(question.id, e.target.checked);
                  }}
                />
                <label
                  htmlFor={`question${question.id}`}
                  className={`${classes["question-chip"]} ${
                    selectedQuestionIds.includes(question.id)
                      ? classes["selected"]
                      : ""
                  }`}
                >
                  {question.text}
                </label>
              </div>
            ))}
          </ul>
        </div>
        <div className={classes["questionsActionsContainer"]}>
          <button
            className={classes["response-button"]}
            onClick={onRequestClose}
          >
            الغاء
          </button>
          <button className={classes["response-button"]} onClick={handleSubmit}>
            ارسال
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default QuestionModal;
