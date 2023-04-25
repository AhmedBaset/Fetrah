import classes from "./Step.module.css";

function StepOne() {
  return (
    <section className={classes["step"]}>
      <div className={classes["container"]}>
        <div className={classes["text"]}>
          <h1>الخطوة الأولى </h1>
          <p>سجل بياناتك بشكل صحيح</p>
          <p>
            قم بالتعريف عن نفسك وأخبرنا بالمواصفات التي تريدها في زوجك حتى
            يمكننا مساعدتك في البحث.
            <br />
          </p>
          <p>
            كلما أخبرتنا بالمزيد عنك وقمت بالإجابة على أسئلة أكثر ستزيد فرصتك في
            التوافق مع من تبحث عنه
          </p>
        </div>
        <div className={classes["image"]}>
          <img src={`/images/step-one.png`} alt="الخطوة الثانية" />
        </div>
      </div>
    </section>
  );
}
export default StepOne;
