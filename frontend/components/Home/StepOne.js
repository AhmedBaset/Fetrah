
function StepOne() {
  return (
    <div className="step-one">
      <h1>خطوات استخدام الموقع</h1>
      <div className="container">
        <div className="image">
          <img src={`/images/step-one.png`} alt="Step-one" />
        </div>
        <div className="text">
          <h1>الخطوة الأولى </h1>
          <p>سجل بياناتك بشكل صحيح</p>
          <p>
            قم بالتعريف عن نفسك وأخبرنا بالمواصفات التي تريدها في زوجك حتى
            يمكننا مساعدتك في البحث.
            <br />
                  </p>
                  <p>
                          كلما أخبرتنا بالمزيد عنك وقمت بالإجابة على
            أسئلة أكثر ستزيد فرصتك في التوافق مع من تبحث عنه</p> 
        </div>
      </div>
    </div>
  );
}
export default StepOne;
