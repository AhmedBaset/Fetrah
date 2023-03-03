import classes from "./QuestionsForm.module.css";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import { useEffect, useState } from "react";
const QuestionsForm = (props) => {
  const [formNumber, setFormNumber] = useState(1);
  const [formData, setFormData] = useState();

  const userGender = props.gender;

  const next = (nextFormNumber, form) => {
    setFormData(form);
    setFormNumber(nextFormNumber);
  };
  const prev = (prevFormNumber, form) => {
    setFormData(form);
    setFormNumber(prevFormNumber);
  };

  return (
    <div className={`${classes["wrapper"]}`}>
      <form action="" id={`${classes["wizard"]}`}>
        {formNumber == 1 && (
          <>
            <Form1 next={next} form={formData} />
          </>
        )}
        {formNumber == 2 && (
          <>
            <Form2
              next={next}
              prev={prev}
              form={formData}
              gender={userGender}
            />
          </>
        )}
        {formNumber == 3 && (
          <>
            <Form3 next={next} prev={prev} form={formData} />
          </>
        )}
      </form>
    </div>
  );
};

export default QuestionsForm;
