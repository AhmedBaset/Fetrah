import { useState } from "react";
import classes from "./QuestionsForm.module.css";
const Form3 = (props) => {
  const formData = props.form;
  const [isFinished, setIsFinished] = useState(false);

  const attrib = isFinished ? `${classes.slideout}` : `${classes.slidein}`;
  const showAttrib = isFinished ? `${classes.show}` : `${classes.hidden}`;
  return (
    <>
      <h1 style={{ textAlign: "center" }} className={`${showAttrib}`}>
        شكرا لك
      </h1>
      <section className={`${attrib}`}>
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
              <h2>تأكيد الهوية</h2>
              <p style={{ marginBottom: "5px" }}>
                يجب أن تراعي الدقة في إدخال البيانات
              </p>
            </div>

            <div className={`${classes["form-row"]} row-md-2`}>
              <div className={`${classes["form-holder"]}`}>
                <div className="form-row">
                  <figure className="figure">
                    <img
                      src="https://cdn.elwatannews.com/watan/610x300/9329604941555756506.jpg"
                      className="figure-img img-fluid rounded"
                      style={{ width: "150px" }}
                      alt="A generic square placeholder image with rounded corners in a figure."
                    />
                    <figcaption className="figure-caption text-right">
                      صورة البطاقة ظهر
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div className={`${classes["form-holder"]}`}>
                <div className="form-row">
                  <figure className="figure">
                    <img
                      src="https://cdn.elwatannews.com/watan/610x300/9329604941555756506.jpg"
                      className="figure-img img-fluid rounded"
                      style={{ width: "150px" }}
                      alt="A generic square placeholder image with rounded corners in a figure."
                    />
                    <figcaption className="figure-caption text-right">
                      صورة البطاقة ظهر
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
            <div className={`${classes["form-row"]} row-md-2`}>
              <div className={`${classes["form-holder"]}`}>
                <div className="form-row">
                  {" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                  />{" "}
                </div>
              </div>
              <div className={`${classes["form-holder"]}`}>
                <div className="form-row">
                  {" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                  />{" "}
                </div>
              </div>
            </div>

            <br />
            <br />
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-3">
                <button
                  onClick={() => {
                    props.prev(2, formData);
                  }}
                  className="btn btn-secondary pe-4 ps-4"
                >
                  السابق
                </button>
              </div>
              <div className="col-md-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsFinished(true);
                    console.log("s");
                  }}
                  className="btn btn-secondary"
                >
                  تفعيل الحساب
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Form3;
