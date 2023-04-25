import classes from "./Step.module.css";

function StepFour() {
  return (
    <section className={classes["step-diff"]}>
      <div className={classes["container"]}>
        <div className={classes["text"]}>
          <h1>الخطوة الرابعة </h1>
          <p>قم بالإجابة على الأسئلة المطلوبة</p>
          <p>
            في مرحلة الأسئلة يمكن لكل طرف أن يختار مجموعة من الأسئلة لكي يرسلها
            للطرف الأخر.
            <br />
          </p>
          <p>
            الأسئلة ستكون معدة مسبقا في بنك الأسئلة وعند الإجابة على أي سؤال
            سيظهر للطرف الأخر إجابتك لكي يحدد موقفه.
          </p>
        </div>
        <div className={classes["image"]}>
          <img src={`/images/step-four.png`} alt="الخطوة الثانية" />
        </div>
      </div>
    </section>
  );
}
export default StepFour;
