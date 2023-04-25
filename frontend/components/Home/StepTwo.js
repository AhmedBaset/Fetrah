import classes from "./Step.module.css";

function StepTwo() {
  return (
    <section className={classes["step-diff"]}>
      <div className={classes["container"]}>
        <div className={classes["text"]}>
          <h1>الخطوة الثانية </h1>
          <p>ابحث بدقة وتمهل في الاختيار</p>
          <p>
            يمكنك البحث عن المواصفات التي تريدها ولكن عليك بالتأني والمشاورة قبل
            كل شيء.
            <br />
          </p>
          <p>
            إذا وجدت المواصفات التي تريدها يمكنك الانتقال للمرحلة التالية وهي
            إرسال القبول المبدئي للطرف الأخر.
          </p>
        </div>
        <div className={classes["image"]}>
          <img src={`/images/step-two.png`} alt="الخطوة الثانية" />
        </div>
      </div>
    </section>
  );
}
export default StepTwo;
