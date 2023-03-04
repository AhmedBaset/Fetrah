import Image from "next/image";
import classes from "./QuestionsForm.module.css";
import MyDropDown from "./MyDropDown";
import { Input, Alert } from "reactstrap";
import { useEffect, useState } from "react";
const Form1 = (props) => {
  let formData = props.form;

  useEffect(() => {
    //restore values if come back from next form page
    if (formData) {
      setAge(formData.get("age"));
      setWeight(formData.get("weight"));
      setHeight(formData.get("height"));
      setJob(formData.get("job"));
      setCertificate(formData.get("certificate"));
    }
  }, [formData]);

  const [showChildQuestions, setShowChildQuestions] = useState(false);
  const [error, setError] = useState("");

  const [generalStatus, setGeneralStatus] = useState("");
  const [malesChild, setMalesChild] = useState("");
  const [femalesChild, setFemalesChild] = useState("");
  const [country, setCountry] = useState("");
  const [skinColor, setSkinColor] = useState("");

  const [job, setJob] = useState("");
  const [jobIsTouched, setJobIsTouched] = useState(false);
  const jobIsValid = job.trim() !== "";
  const jobIsInValid = !jobIsValid && jobIsTouched;

  const [certificate, setCertificate] = useState("");
  const [certificateIsTouched, setCertificateTouched] = useState(false);
  const certificateIsValid = certificate.trim() !== "";
  const certificateIsInValid = !certificateIsValid && certificateIsTouched;

  const [weight, setWeight] = useState("");
  const [weightIsTouched, setWeightIsTouched] = useState(false);
  const weightIsValid =
    weight.trim() !== "" &&
    parseInt(weight.trim()) >= 20 &&
    parseInt(weight.trim()) < 160;
  const weigthIsInValid = !weightIsValid && weightIsTouched;

  const [age, setAge] = useState("");
  const [ageIsTouched, setAgeIsTouched] = useState(false);
  const ageIsValid =
    age.trim() !== "" &&
    parseInt(age.trim()) >= 7 &&
    parseInt(age.trim()) < 100;
  const ageIsInValid = !ageIsValid && ageIsTouched;

  const [height, setHeight] = useState("");
  const [heightIsTouched, setHeightIsTouched] = useState(false);
  const heightIsValid =
    height.trim() !== "" &&
    parseInt(height.trim()) >= 30 &&
    parseInt(height.trim()) < 210;
  const heightIsInValid = !heightIsValid && heightIsTouched;

  const onStatusSelected = (status) => {
    setGeneralStatus(status);
    if (status !== "أعزب") {
      setShowChildQuestions(true);
    } else {
      setShowChildQuestions(false);
    }
  };

  const onMalesChildSelected = (males) => {
    setMalesChild(males);
  };

  const onFemalesChildSelected = (females) => {
    setFemalesChild(females);
  };

  const onCountrySelected = (country) => {
    setCountry(country);
  };

  const onSkinColorSelected = (skinColor) => {
    setSkinColor(skinColor);
  };

  const onJobChange = (e) => {
    setJob(e.target.value);
  };
  const handlJobBlur = (e) => {
    setJobIsTouched(true);
  };

  const onCertificateChange = (e) => {
    setCertificate(e.target.value);
  };
  const handleCertificateBlur = (e) => {
    setCertificateTouched(true);
  };

  const onWeightChange = (e) => {
    setWeight(e.target.value);
  };
  const handleWieghtBlur = (e) => {
    setWeightIsTouched(true);
  };

  const onAgeChange = (e) => {
    setAge(e.target.value);
  };
  const handleAgeBlur = (e) => {
    setAgeIsTouched(true);
  };

  const onHeightChange = (e) => {
    setHeight(e.target.value);
  };
  const handleHeightBlur = (e) => {
    setHeightIsTouched(true);
  };

  const handleNextClicked = (e) => {
    e.preventDefault();
    if (formData === undefined) {
      formData = new FormData();
    }
    if (generalStatus === "") {
      setError("يجب أن تختار حالتك الاجتماعية أولا!");
      return;
    }
    formData.set("0", generalStatus);
    if (generalStatus !== "أعزب") {
      if (malesChild === "") {
        setError("يجب أن تختار عدد أولادك الذكور!");
        return;
      }
      if (femalesChild === "") {
        setError("يجب أن تختار عدد بناتك!");
        return;
      }
    }
    formData.set("2", malesChild);
    formData.set("3", femalesChild);
    if (country === "") {
      setError("يجب أن تختار بلدك!");
      return;
    }
    formData.set("1", country);
    if (height === "" || heightIsInValid) {
      setError("يجب أن تحدد طولك!");
      return;
    }
    formData.set("4", height);
    if (weight === "" || weigthIsInValid) {
      setError("يجب أن تحدد وزنك!");
      return;
    }
    formData.set("5", weight);
    if (skinColor === "") {
      setError("يجب أن تحدد لون بشرتك!");
      return;
    }
    formData.set("7", skinColor);
    if (age === "" || ageIsInValid) {
      setError("يجب أن تحدد عمرك!");
      return;
    }
    formData.set("6", age);
    if (job === "" || jobIsInValid) {
      setError("يجب أن تحدد وظيفتك!");
      return;
    }
    formData.set("8", job);
    if (certificate === "" || certificateIsInValid) {
      setError("يجب أن تحدد مؤهلك التعليمي!");
      return;
    }
    formData.set("9", certificate);

    // go to next form
    props.next(2, formData);
  };

  return (
    <>
      <section className={`${classes.slidein} `}>
        <div className={classes.inner}>
          <div className={`${classes["image-holder"]} `}>
            <Image
              src="/images/website_logo.jpg"
              width={350}
              height={520}
              alt="image1"
            />
          </div>
          <div className={`${classes["form-content"]}`}>
            <div className={`${classes["form-header"]} `}>
              <h2>المعلومات العامة</h2>
              <p style={{ marginBottom: "5px" }}>
                يجب أن تراعي الدقة في إدخال البيانات
              </p>
            </div>

            <div className={`${classes["form-row"]} row-md-2`}>
              <div className={`${classes["form-holder"]}`}>
                <div className="form-row">
                  <MyDropDown
                    title={"الحالة الاجتماعية"}
                    data={["أعزب", "متزوج", "أرمل", "مطلق"]}
                    onClick={onStatusSelected}
                  />
                </div>
              </div>
              <div className={`${classes["form-holder"]}`}>
                <div className="form-row">
                  <MyDropDown
                    title={"أين تعيش حاليا"}
                    data={[
                      "مصر",
                      "العراق",
                      "المغرب",
                      "الشام",
                      "الجزيرة العربية",
                    ]}
                    onClick={onCountrySelected}
                  />
                </div>
              </div>
            </div>
            {showChildQuestions && (
              <div className={`${classes["form-row"]} row-md-2`}>
                <div className={`${classes["form-holder"]}`}>
                  <div className="form-row">
                    <MyDropDown
                      title={"عدد أولادك الذكور"}
                      data={[
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                        "11",
                        "12",
                        "13",
                        "14",
                        "15",
                      ]}
                      onClick={onMalesChildSelected}
                    />
                  </div>
                </div>
                <div className={`${classes["form-holder"]}`}>
                  <div className="form-row">
                    <MyDropDown
                      title={"عدد بناتك"}
                      data={[
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                        "11",
                        "12",
                        "13",
                        "14",
                        "15",
                      ]}
                      onClick={onFemalesChildSelected}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className={`${classes["form-row"]} row-md-2`}>
              <div className={`${classes["form-holder"]}`}>
                <div className="form-row">
                  {"الطول التقريبي"}
                  <div>
                    <Input
                      contentEditable={true}
                      onChange={onHeightChange}
                      onBlur={handleHeightBlur}
                      invalid={heightIsInValid}
                      value={height}
                      bsSize="sm"
                      type="number"
                      placeholder="كم يبلغ طولك ؟"
                    />
                  </div>
                </div>
              </div>
              <div className={`${classes["form-holder"]}`}>
                <div className="form-row">
                  {" الوزن التقريبي"}
                  <div>
                    <Input
                      onChange={onWeightChange}
                      onBlur={handleWieghtBlur}
                      contentEditable={true}
                      invalid={weigthIsInValid}
                      value={weight}
                      bsSize="sm"
                      type="number"
                      placeholder="كم يبلغ وزنك ؟"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${classes["form-row"]} row-md-2`}>
              <div className={`${classes["form-holder"]}`}>
                <div className="form-row">
                  {"لون البشرة"}
                  <MyDropDown
                    title={"لون بشرتك"}
                    data={[
                      "بيضاء جدا",
                      "بيضاء",
                      "متوسطة",
                      "قمحية",
                      "داكنة",
                      "داكنة جدا",
                    ]}
                    onClick={onSkinColorSelected}
                  />
                </div>
              </div>
              <div className={`${classes["form-holder"]}`}>
                <div className="form-row">
                  {"العمر تقريبا"}
                  <div>
                    <Input
                      contentEditable={true}
                      onChange={onAgeChange}
                      onBlur={handleAgeBlur}
                      invalid={ageIsInValid}
                      bsSize="sm"
                      value={age}
                      type="number"
                      placeholder="كم يبلغ عمرك ؟"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${classes["form-row"]} row-md-2`}>
              <div className={`${classes["form-holder"]}`}>
                <div className="form-row">
                  {"المؤهل أو الشهادة"}
                  <div>
                    <Input
                      contentEditable={true}
                      onChange={onCertificateChange}
                      onBlur={handleCertificateBlur}
                      invalid={certificateIsInValid}
                      value={certificate}
                      bsSize="sm"
                      type="text"
                      placeholder="شهادتك التعليمية"
                    />
                  </div>
                </div>
              </div>
              <div className={`${classes["form-holder"]}`}>
                <div className="form-row">
                  {"الوظيفة"}
                  <div>
                    <Input
                      onChange={onJobChange}
                      onBlur={handlJobBlur}
                      contentEditable={true}
                      invalid={jobIsInValid}
                      value={job}
                      bsSize="sm"
                      type="text"
                      placeholder="ما هي وظيفتك ؟"
                    />
                  </div>
                </div>
              </div>
            </div>
            {error && (
              <Alert style={{ direction: "rtl" }} color="danger">
                {error}
              </Alert>
            )}
            {!error && (
              <>
                <br />
                <br />
                <br />
              </>
            )}

            <div className="row">
              <div className="col-md-5"></div>
              <div className="col-md-7">
                <button
                  onClick={handleNextClicked}
                  className="btn btn-secondary pe-4 ps-4"
                >
                  التالي
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Form1;
