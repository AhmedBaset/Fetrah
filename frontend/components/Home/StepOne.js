import classes from "./StepOne.module.css";

function StepOne() {
  return (
    <div className={classes["step-one"]}>
      <div className={classes["parent"]}>
        <div className={classes["child"]}>
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
    </div>
  );
}
export default StepOne;
