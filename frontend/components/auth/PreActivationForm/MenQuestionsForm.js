import classes from "./MenQuestionsForm.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { signup } from "../../../actions/auth";
import jwt from "jsonwebtoken";

const MenQuestionsForm = (props) => {
  const router = props.router;

  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    name: "",
    token: "",
  });

  const { name, token } = values;

  useEffect(() => {
    let token = router.query.id;
    if (token) {
      const decodedToken = jwt.decode(token);
      setValues({ ...values, name: decodedToken.name, token });
    }
  }, [router]);

  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);

  const [formData, setFormData] = useState({
    generalStatus: "",
    country: "",
    nationality: "",
    state: "",
    certificate: "",
    job: "",
    maleChilds: "",
    femaleChilds: "",
    age: "",
    weight: "",
    height: "",
    skinColor: "",
    pary: "",
    le7ya: "",
    quran: "",
    aboutYou: "",
    aboutYourPartner: "",
    idPhoto1: "",
    idPhoto2: "",
    idNumber: "",
  });

  const jobIsValid = formData.job.trim() !== "";

  const certificateIsValid = formData.certificate.trim() !== "";

  const showChildQuestions = formData.generalStatus !== "أعزب" && formData.generalStatus !== "";
  console.log(showChildQuestions);
  const showStateQuestion = formData.country !== "";

  const ageIsValid =
    formData.age.trim() !== "" &&
    parseInt(formData.age.trim()) >= 7 &&
    parseInt(formData.age.trim()) < 100;

  const heightIsValid =
    formData.height.trim() !== "" &&
    parseInt(formData.height.trim()) >= 30 &&
    parseInt(formData.height.trim()) < 210;

  const weightIsValid =
    formData.weight.trim() !== "" &&
    parseInt(formData.weight.trim()) >= 20 &&
    parseInt(formData.weight.trim()) < 160;

  const aboutYouIsValid = formData.aboutYou.trim() !== "";
  const aboutYourPartnerIsValid = formData.aboutYourPartner.trim() !== "";

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleOnPhoto1Change = (e) => {
    var file = e.target.files[0];
    setSelectedImage1(file);
    var reader = new FileReader();
    let value = undefined;
    reader.onloadend = function () {
      // console.log("RESULT", reader.result);
      value = reader.result;
      setFormData((prevFormData) => ({
        ...prevFormData,
        idPhoto1: value,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleOnPhoto2Change = (e) => {
    var file = e.target.files[0];
    setSelectedImage2(file);
    var reader = new FileReader();
    let value = undefined;
    reader.onloadend = function () {
      // console.log("RESULT", reader.result);
      value = reader.result;
      setFormData((prevFormData) => ({
        ...prevFormData,
        idPhoto2: value,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmition = (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    if (formData.generalStatus === "") {
      setError("يجب أن تختار حالتك الاجتماعية أولا!");
      handleScrollToEnd();
      return;
    }
    newFormData.set("0", formData.generalStatus);

    if (formData.generalStatus !== "أعزب") {
      if (formData.maleChilds === "") {
        setError("يجب أن تختار عدد أولادك الذكور!");
        handleScrollToEnd();
        return;
      }
      if (formData.femaleChilds === "") {
        setError("يجب أن تختار عدد بناتك!");
        handleScrollToEnd();
        return;
      }
    }
    newFormData.set("2", formData.maleChilds);
    newFormData.set("3", formData.femaleChilds);

    if (formData.country === "") {
      setError("يجب أن تختار بلدك!");
      handleScrollToEnd();
      return;
    }
    newFormData.set("1", formData.country);

    if (formData.nationality === "") {
      setError("يجب أن تحدد جنسيتك");
      handleScrollToEnd();
      return;
    }
    newFormData.set("37", formData.nationality);

    if (formData.state === "") {
      setError("يجب أن تحدد المحافظة التي تسكن بها");
      handleScrollToEnd();
      return;
    }
    newFormData.set("16", formData.state);

    if (formData.height === "" || !heightIsValid) {
      setError("يجب أن تحدد طولك!");
      handleScrollToEnd();
      return;
    }
    newFormData.set("4", formData.height);
    if (formData.weight === "" || !weightIsValid) {
      setError("يجب أن تحدد وزنك!");
      handleScrollToEnd();
      return;
    }
    newFormData.set("5", formData.weight);

    if (formData.age === "" || !ageIsValid) {
      setError("يجب أن تحدد عمرك!");
      handleScrollToEnd();
      return;
    }
    newFormData.set("6", formData.age);

    if (formData.skinColor === "") {
      setError("يجب أن تحدد لون بشرتك!");
      handleScrollToEnd();
      return;
    }
    newFormData.set("7", formData.skinColor);

    if (formData.job === "" || !jobIsValid) {
      setError("يجب أن تحدد وظيفتك!");
      handleScrollToEnd();
      return;
    }
    newFormData.set("8", formData.job);

    if (formData.certificate === "" || !certificateIsValid) {
      setError("يجب أن تحدد مؤهلك التعليمي!");
      handleScrollToEnd();
      return;
    }
    newFormData.set("9", formData.certificate);

    if (formData.aboutYou === "" || !aboutYouIsValid) {
      setError("يجب أن تكتب أكثر عن نفسك");
      handleScrollToEnd();
      return;
    }
    newFormData.set("10", formData.aboutYou);

    if (formData.aboutYourPartner === "" || !aboutYourPartnerIsValid) {
      setError("يجب أن تكتب أكثر عن مواصفات زوجتك");
      handleScrollToEnd();
      return;
    }
    newFormData.set("11", formData.aboutYourPartner);

    if (formData.pary === "") {
      setError("يجب أن تحدد مدى التزامك بالصلاة!");
      handleScrollToEnd();
      return;
    }
    newFormData.set("13", formData.pary);

    if (formData.le7ya === "") {
      setError("يجب أن تجيب على كل الأسئلة المتعلقة بالدين!");
      handleScrollToEnd();
      return;
    }
    newFormData.set("23", formData.le7ya);

    if (formData.quran === "") {
      setError("يجب أن تجيب على كل الأسئلة المتعلقة بالدين!");
      handleScrollToEnd();
      return;
    }
    newFormData.set("18", formData.quran);

    if (formData.idPhoto1 === "") {
      setError("يجب أن تضع صورة بطاقة الهوية - أمام");
      handleScrollToEnd();
      return;
    }
    newFormData.set("idPhoto1", formData.idPhoto1);

    if (formData.idPhoto2 === "") {
      setError("يجب أن تضع صورة بطاقة الهوية - خلف");
      handleScrollToEnd();
      return;
    }
    newFormData.set("idPhoto2", formData.idPhoto2);

    if (formData.idNumber === "" || formData.idNumber.length <= 7) {
      setError("رقم بطاقة الهوية غير صحيح ... تأكد منه");
      handleScrollToEnd();
      return;
    }
    newFormData.set("idNumber", formData.idNumber);

    

    for (let pair of newFormData.entries()) {
      console.log(`${pair[0]} : ${pair[1]}`);
    }

    makeSignupRequest(newFormData);
  };

  const makeSignupRequest = (formData) => {
    setLoading(true);
    setError(undefined);
    signup({ token }, formData).then((data) => {
      if (data.error) {
        setLoading(false);
        setError(data.error);
        setMessage("");
      } else {
        setLoading(false);
        setError(undefined);
        setMessage(
          "لقد قمت بتسجيل بياناتك بنجاح ... سيتم مراجعة بياناتك للتأكد من موافقتها  للمعايير المطلوبة"
        );
      }
      handleScrollToEnd();
    });
  };

  const showLoading = () =>
    loading ? (
      <div className="alert alert-info" role="alert">
        <div className="text-center">برجاء الانتظار</div>
      </div>
    ) : (
      ""
    );

  const showMessage = () =>
    message ? (
      <div className="alert alert-info" role="alert">
        <div className="text-center">{message}</div>
      </div>
    ) : (
      ""
    );

  const showError = () =>
    error ? (
      <div className="alert alert-danger" role="alert">
        <div className="text-center">{error}</div>
      </div>
    ) : (
      ""
    );

  const handleScrollToEnd = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // Optional, smooth scrolling animation
    });
  };

  return (
    <>
      <div className={classes.formContainer}>
        <h4 className={classes.title}>المعلومات العامة</h4>
        <div className={classes.generalInfoContainer}>
          <div className={classes.girow1}>
            <div className={classes.inputContainer}>
              <label className={classes.inputLabel}>الحالة الاجتماعية*</label>
              <select
                name="generalStatus"
                value={formData.generalStatus}
                onChange={handleInputChange}
                className={classes["dropdown"]}
                required={true}
              >
                <option value="">اختر حالتك</option>
                <option value="أعزب">أعزب</option>
                <option value="متزوج">متزوج</option>
                <option value="مطلق">مطلق</option>
                <option value="أرمل">أرمل</option>
              </select>
            </div>
            <div className={classes.inputContainer}>
              <label className={classes.inputLabel}>أين تعيش حاليا*</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={classes["dropdown"]}
                required={true}
              >
                <option value="">اختر بلدك</option>
                <option value="مصر">مصر</option>
                <option value="المغرب">المغرب</option>
                <option value="الجزائر">الجزائر</option>
                <option value="تونس">تونس</option>
                <option value="ليبيا">ليبيا</option>
                <option value="السودان">السودان</option>
                <option value="لبنان">لبنان</option>
                <option value="الأردن">الأردن</option>
                <option value="سوريا">سوريا</option>
                <option value="العراق">العراق</option>
                <option value="الجزيرة العربية">الجزيرة العربية</option>
                <option value="اليمن">اليمن</option>
                <option value="فلسطين">فلسطين</option>
                <option value="الإمارات">الإمارات</option>
                <option value="الكويت">الكويت</option>
                <option value="البحرين">البحرين</option>
                <option value="قطر">قطر</option>
              </select>
            </div>
            <div className={classes.inputContainer}>
              <label className={classes.inputLabel}>الجنسية*</label>
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                className={classes["dropdown"]}
                required={true}
              >
                <option value="">اختر بلدك</option>
                <option value="مصر">مصر</option>
                <option value="المغرب">المغرب</option>
                <option value="الجزائر">الجزائر</option>
                <option value="تونس">تونس</option>
                <option value="ليبيا">ليبيا</option>
                <option value="السودان">السودان</option>
                <option value="لبنان">لبنان</option>
                <option value="الأردن">الأردن</option>
                <option value="سوريا">سوريا</option>
                <option value="العراق">العراق</option>
                <option value="الجزيرة العربية">الجزيرة العربية</option>
                <option value="اليمن">اليمن</option>
                <option value="فلسطين">فلسطين</option>
                <option value="الإمارات">الإمارات</option>
                <option value="الكويت">الكويت</option>
                <option value="البحرين">البحرين</option>
                <option value="قطر">قطر</option>
              </select>
            </div>
          </div>
          <div className={classes.girow2}>
            <div className={classes.inputContainer}>
              <label className={classes.inputLabel}>المؤهل أو الشهادة*</label>
              <select
                name="certificate"
                value={formData.certificate}
                onChange={handleInputChange}
                className={classes["dropdown"]}
                required={true}
              >
                <option value="">اختر مؤهلك</option>
                <option value="الشهادة الابتدائية">الشهادة الابتدائية</option>
                <option value="الشهادة الاعدادية">الشهادة الاعدادية</option>
                <option value="الشهادة الثانوية">الشهادة الثانوية</option>
                <option value="الجامعية الجامعية">الشهادة الجامعية</option>
                <option value="ماجستير">دراسات عليا - ماجستير</option>
                <option value="دكتوراة">دراسات عليا - دكتوراة</option>
              </select>
            </div>
            <div className={classes.inputContainer}>
              <label className={classes.inputLabel}>الوظيفة*</label>
              <input
                type="text"
                name="job"
                value={formData.job}
                onChange={handleInputChange}
                className={classes["textInput"]}
                required
              />
            </div>
            <div className={classes.inputContainer}>
              {showStateQuestion && (
                <>
                  <label className={classes.inputLabel}>
                    المحافظة أو المدينة التي تعيش بها*
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={classes["dropdown"]}
                    required={true}
                  >
                    <option value="">اختر حالتك</option>
                    <option value="أعزب">أعزب</option>
                    <option value="متزوج">متزوج</option>
                    <option value="مطلق">مطلق</option>
                    <option value="أرمل">أرمل</option>
                  </select>
                </>
              )}
            </div>
          </div>
          {showChildQuestions && (
            <div className={classes.girow3}>
              <div className={classes.inputContainer}>
                <label className={classes.inputLabel}>عدد أولادك الذكور*</label>
                <select
                  name="maleChilds"
                  value={formData.maleChilds}
                  onChange={handleInputChange}
                  className={classes["dropdown"]}
                  required={true}
                >
                  <option value="">اختر</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                </select>
              </div>
              <div className={classes.inputContainer}>
                <label className={classes.inputLabel}>عدد بناتك*</label>
                <select
                  name="femaleChilds"
                  value={formData.femaleChilds}
                  onChange={handleInputChange}
                  className={classes["dropdown"]}
                  required={true}
                >
                  <option value="">اختر</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                </select>
              </div>
              <div className={classes.inputContainer}></div>
            </div>
          )}
        </div>
        <div className={classes.personalInfoContainer}>
          <h4 className={classes.title}>المعلومات الشخصية</h4>
          <div className={classes.pirow1}>
            <div className={classes.inputContainer}>
              <label className={classes.inputLabel}>العمر*</label>
              <input
                type="Number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className={classes["textInput"]}
                required
              />
            </div>
            <div className={classes.inputContainer}>
              <label className={classes.inputLabel}>الطول*</label>
              <input
                type="Number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className={classes["textInput"]}
                required
              />
            </div>
            <div className={classes.inputContainer}>
              <label className={classes.inputLabel}>الوزن*</label>
              <input
                type="Number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className={classes["textInput"]}
                required
              />
            </div>
          </div>
          <div className={classes.pirow2}>
            <div className={classes.inputContainer}>
              <label className={classes.inputLabel}>لون البشرة*</label>
              <select
                name="skinColor"
                value={formData.skinColor}
                onChange={handleInputChange}
                className={classes["dropdown"]}
                required={true}
              >
                <option value="">اختر</option>
                <option value="بيضاء جدا">بيضاء جدا</option>
                <option value="بيضاء">بيضاء</option>
                <option value="متوسطة">متوسطة</option>
                <option value="قمحية">قمحية</option>
                <option value="داكنة">داكنة</option>
                <option value="داكنة جدا">داكنة</option>
              </select>
            </div>
          </div>
        </div>
        <div className={classes.religionInfoContainer}>
          <h4 className={classes.title}>معلومات عن دينك</h4>
          <div className={classes.rirow1}>
            <div className={classes.inputContainer}>
              <label className={classes.inputLabel}>
                ما مدى التزامك بالصلاة؟*
              </label>
              <select
                name="pary"
                value={formData.pary}
                onChange={handleInputChange}
                className={classes["dropdown"]}
                required={true}
              >
                <option value="">اختر</option>
                <option value="أصلي جميع الصلوات في وقتها في المسجد">
                  أصلي جميع الصلوات في وقتها في المسجد
                </option>
                <option value="أصلي جميع الصلوات في وقتها في البيت">
                  أصلي جميع الصلوات في وقتها في البيت
                </option>
                <option value="أصلي جميع الصلوات ولكن قد أفوت بعض الصلوات عن وقتها">
                  أصلي جميع الصلوات ولكن قد أفوت بعض الصلوات عن وقتها
                </option>
                <option value="متقطع في الصلاة">متقطع في الصلاة</option>
                <option value="لا أصلي">لا أصلي معظم الوقت</option>
              </select>
            </div>
            <div className={classes.inputContainer}>
              <label className={classes.inputLabel}>هل أنت ملتحي؟*</label>
              <select
                name="le7ya"
                value={formData.le7ya}
                onChange={handleInputChange}
                className={classes["dropdown"]}
                required={true}
              >
                <option value="">اختر</option>
                <option value="ملتحي">ملتحي</option>
                <option value="لحية خفيفة">لحية خفيفة</option>
                <option value="حليق">أملس</option>
              </select>
            </div>
            <div className={classes.inputContainer}>
              <label className={classes.inputLabel}>
                عدد الأجزاء التي تحفظها من القرآن*
              </label>
              <select
                name="quran"
                value={formData.quran}
                onChange={handleInputChange}
                className={classes["dropdown"]}
                required={true}
              >
                <option value="">اختر</option>
                <option value="جزء واحد">جزء واحد - 1</option>
                <option value="جزءان">جزءان - 2</option>
                <option value="ثلاثة أجزاء">ثلاثة أجزاء - 3</option>
                <option value="أربعة أجزاء">أربعة أجزاء - 4</option>
                <option value="خمسة أجزاء">خمسة أجزاء - 5</option>
                <option value="ستة أجزاء">ستة أجزاء - 6</option>
                <option value="سبعة أجزاء">سبعة أجزاء - 7</option>
                <option value="ثمانية أجزاء">ثمانية أجزاء - 8</option>
                <option value="تسعة أجزاء">تسعة أجزاء - 9</option>
                <option value="عشرة أجزاء">عشرة أجزاء - 10</option>
                <option value="أحد عشر جزءا">أحد عشر جزءا - 11</option>
                <option value="اثنا عشر جزءا">اثنا عشر جزءا - 12</option>
                <option value="ثلاثة عشر جزءا">ثلاثة عشر جزءا - 13</option>
                <option value="أربعة عشر جزءا">أربعة عشر جزءا - 14</option>
                <option value="خمسة عشر جزءا">خمسة عشر جزءا - 15</option>
                <option value="ستة عشر جزءا">ستة عشر جزءا - 16</option>
                <option value="سبعة عشر جزءا">سبعة عشر جزءا - 17</option>
                <option value="ثمانية عشر جزءا">ثمانية عشر جزءا - 18</option>
                <option value="تسعة عشر جزءا">تسعة عشر جزءا - 19</option>
                <option value="عشرون جزءا">عشرون جزءا - 20</option>
                <option value="واحد وعشرون جزءا">واحد وعشرون جزءا - 21</option>
                <option value="ثنان وعشرون جزءا">اثنان وعشرون جزءا - 22</option>
                <option value="ثلاثة وعشرون جزءا">
                  ثلاثة وعشرون جزءا - 23
                </option>
                <option value="أربعة وعشرون جزءا">
                  أربعة وعشرون جزءا - 24
                </option>
                <option value="خمسة وعشرون جزءا">خمسة وعشرون جزءا - 25</option>
                <option value="ستة وعشرون جزءا">ستة وعشرون جزءا - 26</option>
                <option value="سبعة وعشرون جزءا">سبعة وعشرون جزءا - 27</option>
                <option value="ثمانية وعشرون جزءا">
                  ثمانية وعشرون جزءا - 28
                </option>
                <option value="تسعة وعشرون جزءا">تسعة وعشرون جزءا - 29</option>
                <option value="ختمت القرآن">ختمت القرآن - 30</option>
              </select>
            </div>
          </div>
        </div>
        <div className={classes.marryInfoContainer}>
          <h4 className={classes.title}>معلومات تخص الزواج</h4>
          <div className={classes.mirow1}>
            <div className={classes.inputContainer}>
              <label className={classes.inputLabel}>
                أخبرنا عن نفسك أو بما يقوله الناس عنك*
              </label>
              <textarea
                type="text"
                name="aboutYou"
                value={formData.aboutYou}
                onChange={handleInputChange}
                className={classes["longTextInput"]}
                required
              ></textarea>
            </div>
          </div>
          <div className={classes.mirow2}>
            <div className={classes.inputContainer}>
              <label className={classes.inputLabel}>
                ما هي المواصفات التي تريدها في زوجتك*
              </label>
              <textarea
                type="text"
                name="aboutYourPartner"
                value={formData.aboutYourPartner}
                onChange={handleInputChange}
                className={classes["longTextInput"]}
                required
              ></textarea>
            </div>
          </div>
        </div>
        <div className={classes.idInfoContainer}>
          <h4 className={classes.title}>تأكيد الهوية</h4>
          <div className={classes.iirow1}>
            <div className={classes.inputContainer}>
              <label className={classes.inputLabel}>
                صورة بطاقة الهوية - أمام*
              </label>
              <div>
                <label htmlFor="imageInput1">
                  {selectedImage1 && (
                    <Image
                      className={classes.idImage}
                      src={URL.createObjectURL(selectedImage1)}
                      alt={""}
                      width={320}
                      height={200}
                    />
                  )}
                  {!selectedImage1 && (
                    <Image
                      className={classes.idImage}
                      src={"/images/idfront.svg"}
                      alt={""}
                      width={320}
                      height={200}
                    />
                  )}
                </label>
                <input
                  type="file"
                  id="imageInput1"
                  style={{ display: "none" }}
                  onChange={handleOnPhoto1Change}
                />
              </div>
            </div>
            <div className={classes.inputContainer}>
              <label className={classes.inputLabel}>
                صورة بطاقة الهوية - خلف*
              </label>
              <div>
                <label htmlFor="imageInput2">
                  {selectedImage2 && (
                    <Image
                      className={classes.idImage}
                      src={URL.createObjectURL(selectedImage2)}
                      alt={""}
                      width={320}
                      height={200}
                    />
                  )}
                  {!selectedImage2 && (
                    <Image
                      className={classes.idImage}
                      src={"/images/idback.svg"}
                      alt={""}
                      width={320}
                      height={200}
                    />
                  )}
                </label>
                <input
                  type="file"
                  id="imageInput2"
                  style={{ display: "none" }}
                  onChange={handleOnPhoto2Change}
                />
              </div>
            </div>
            <div className={classes.inputContainer}></div>
          </div>

          <div className={classes.iirow2}>
            <div className={classes.inputContainer}>
              <label className={classes.inputLabel}>رقم بطاقة الهوية*</label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleInputChange}
                className={classes["textInput"]}
                required
              />
            </div>
          </div>
        </div>
        <div className={classes.submitBtnContainer}>
          <button
            className={classes["submit"]}
            onClick={handleSubmition}
            type="submit"
          >
            تأكيد البيانات
          </button>
          <br />
          <br />
          {showLoading()}
          {error && showError()}
          {message && showMessage()}
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default withRouter(MenQuestionsForm);
