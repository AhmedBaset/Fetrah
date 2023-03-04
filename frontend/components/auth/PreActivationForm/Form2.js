import classes from "./QuestionsForm.module.css";
import { FormGroup, Label, Input, Row } from "reactstrap";
import { useState, useEffect } from "react";
const Form1 = (props) => {
  let formData = props.form;
  const [error, setError] = useState("");
  useEffect(() => {
    //restore values if come back from next form page
    if (formData && formData.has("aboutMe")) {
      setAboutMe(formData.get("aboutMe"));
      setAboutYourPartner(formData.get("aboutYourPartner"));
    }
  }, [formData]);
  const userGender = props.gender;

  let aboutMeMessage;
  let aboutYourPartnerMessage;
  if (userGender === "man") {
    aboutMeMessage = "أخبرنا عن نفسك أو بما يقوله الناس عنك";
    aboutYourPartnerMessage = "ما هي المواصفات التي تريدها في زوجتك ؟";
  } else {
    aboutMeMessage = "أخبرينا عن نفسك أو بما يقوله الناس عنك";
    aboutYourPartnerMessage = "ما هي المواصفات التي تريدينها في زوجك ؟";
  }

  const [aboutMe, setAboutMe] = useState("");
  const [aboutMeIsTouched, setAboutMeIsTouched] = useState(false);
  const aboutMeIsValid = aboutMe.trim() !== "";
  const aboutMeIsInValid = !aboutMeIsValid && aboutMeIsTouched;

  const [aboutYourPartner, setAboutYourPartner] = useState("");
  const [aboutYourPartnerIsTouched, setAboutYourPartnerIsTouched] =
    useState(false);
  const aboutYourPartnerIsValid = aboutYourPartner.trim() !== "";
  const aboutYourPartnerIsInValid =
    !aboutYourPartnerIsValid && aboutYourPartnerIsTouched;

  const onAboutYourPartnerChange = (e) => {
    setAboutYourPartner(e.target.value);
  };

  const handleAboutYourPartnerBlur = (e) => {
    setAboutYourPartnerIsTouched(true);
  };

  const onAboutMeChange = (e) => {
    setAboutMe(e.target.value);
  };

  const handleAboutMeBlur = (e) => {
    setAboutMeIsTouched(true);
  };
  const btnText = userGender === "man" ? "التالي" : "تفعيل الحساب";

  const onNextClicked = (e) => {
    e.preventDefault();
    if (aboutMeIsInValid) {
      setError("يجب أن تكتب أكثر عن نفسك");
      return;
    }
    formData.set("10", aboutMe);
    if (aboutYourPartnerIsInValid) {
      setError("يجب أن تكتب مواصفات زوجك");
      return;
    }
    formData.set("11", aboutYourPartner);

    props.next(3, formData);
  };
  return (
    <>
      <section className={`${classes.slidein}`}>
        <div className={classes.inner}>
          <div className={`${classes["image-holder"]}`}>
            <img
              src="https://colorlib.com/etc/bwiz/colorlib-wizard-1/images/form-wizard-1.jpg"
              alt=""
            />
          </div>
          <div
            className={`${classes["form-content"]} d-flex flex-column bd-highlight justify-content-md-evenly`}
          >
            <div className={`${classes["form-header"]}`}>
              <h2>بيانات الشخصية </h2>
              <p style={{ marginBottom: "5px" }}>
                يجب أن تراعي الدقة في إدخال البيانات
              </p>
            </div>
            <Row className="w-100">
              <FormGroup style={{ direction: "rtl" }} className="w-100">
                <Label for="aboutMe">{aboutMeMessage}</Label>
                <Input
                  id="aboutMe"
                  name="text"
                  onChange={onAboutMeChange}
                  onBlur={handleAboutMeBlur}
                  value={aboutMe}
                  invalid={aboutMeIsInValid}
                  type="textarea"
                  style={{ height: "100px" }}
                />
              </FormGroup>
              <FormGroup style={{ direction: "rtl" }} className="w-100">
                <Label for="aboutYourPartner">{aboutYourPartnerMessage}</Label>
                <Input
                  id="aboutYourPartner"
                  name="text"
                  onChange={onAboutYourPartnerChange}
                  onBlur={handleAboutYourPartnerBlur}
                  value={aboutYourPartner}
                  invalid={aboutYourPartnerIsInValid}
                  type="textarea"
                  style={{ height: "100px" }}
                />
              </FormGroup>
            </Row>
            {error && (
              <Alert style={{ direction: "rtl" }} color="danger">
                {error}
              </Alert>
            )}
            {!error && (
              <>
                <br />
                <br />
              </>
            )}

            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    props.prev(1, formData);
                  }}
                  className="btn btn-secondary pe-4 ps-4"
                >
                  السابق
                </button>
              </div>
              <div className="col-md-3">
                <button
                  onClick={onNextClicked}
                  className="btn btn-secondary pe-4 ps-4"
                >
                  {btnText}
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
