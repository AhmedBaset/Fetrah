import classes from "./StepOne.module.css";

function StepThree() {
  return (
    <div className={classes["step-one"]}>
      <div className={classes["parent"]}>
        <div className={classes["child"]}>
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
    </div>
  );
}
export default StepThree;
