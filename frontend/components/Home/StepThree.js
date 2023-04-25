import classes from "./Step.module.css";

function StepThree() {
  return (
    <section className={classes["step"]}>
      <div className={classes["container"]}>
        <div className={classes["text"]}>
          <h1>الخطوة الثالثة </h1>
          <p>أرسل طلب القبول وانتظر رد الطرف الأخر</p>
          <p>
            ييمكنك إرسال طلب قبول مبدئي لشخص واحد فقط كل 24 ساعة وسيظهر هذا
            الطلب على شكل رسالة للطرف الأخر تخبره أنك تجده مناسبا بالنسبة لك.
            <br />
          </p>
          <p>
            إذا قام الطرف الأخر بقبول طلبك سوف تنتقلان معا لمرحلة الأسئلة حيث
            يجيب كل طرف على أسئلة الأخر.
          </p>
        </div>
        <div className={classes["image"]}>
          <img src={`/images/step-three.png`} alt="الخطوة الثانية" />
        </div>
      </div>
    </section>
  );
}
export default StepThree;
