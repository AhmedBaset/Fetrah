import image from "../images/step-four.png";
function StepFour() {
  return (
    <div className="step-four">
      <div className="container">
        <div className="text">
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
        <div className="image">
          <img src={image} alt="Step-one" />
        </div>
      </div>
    </div>
  );
}
export default StepFour;
