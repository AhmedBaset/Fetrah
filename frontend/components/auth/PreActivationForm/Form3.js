import { useState, useEffect } from "react";
import classes from "./QuestionsForm.module.css";
import { withRouter } from "next/router";
import { signup } from "../../../actions/auth";
import jwt from "jsonwebtoken";

const Form3 = (props) => {
  const formData = props.form;
  const [isFinished, setIsFinished] = useState(false);
  const router = props.router;
  const attrib = isFinished ? `${classes.slideout}` : `${classes.slidein}`;
  const showAttrib = isFinished ? `${classes.show}` : `${classes.hidden}`;

  const [values, setValues] = useState({
    name: "",
    token: "",
    error: "",
    loading: false,
    success: false,
    showButton: true,
  });

  const { name, token, error, loading, success, showButton } = values;

  useEffect(() => {
    let token = router.query.id;
    if (token) {
      const decodedToken = jwt.decode(token);
      setValues({ ...values, name: decodedToken.name, token });
    }
  }, [router]);

  const clickSubmit = (e) => {
    e.preventDefault();
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    setValues({ ...values, loading: true, error: false });
    signup({ token }, formData).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
          showButton: false,
        });
      } else {
        setValues({
          ...values,
          loading: false,
          success: true,
          showButton: false,
        });
        setIsFinished(true);
      }
    });
  };

  const handleOnPhoto1Change = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    let value = undefined;
    reader.onloadend = function () {
      console.log("RESULT", reader.result);
      value = reader.result;
      formData.set("idPhoto1", value);
    };
    reader.readAsDataURL(file);
  };

  const handleOnPhoto2Change = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    let value = undefined;
    reader.onloadend = function () {
      console.log("RESULT", reader.result);
      value = reader.result;
      formData.set("idPhoto2", value);
    };
    reader.readAsDataURL(file);
  };

  const showLoading = () => (loading ? <h2>Loading...</h2> : "");

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
                  <div>
                    <div className="form-group pb-2 mb-3">
                      <br />
                      <small className="text-muted d-block">Max size 1mb</small>
                      <label className="btn btn-outline-info">
                        صورة بطاقة الهوية - وجه
                        <input
                          onChange={handleOnPhoto1Change}
                          type="file"
                          accept="image/*"
                          className="form-control"
                          hidden
                        />
                      </label>
                    </div>
                  </div>
                  <figure className="figure">
                    <img
                      src="https://cdn.elwatannews.com/watan/610x300/9329604941555756506.jpg"
                      className="figure-img img-fluid rounded"
                      style={{ width: "150px" }}
                      alt="A generic square placeholder image with rounded corners in a figure."
                    />
                    <figcaption className="figure-caption text-right"></figcaption>
                  </figure>
                </div>
              </div>
              <div className={`${classes["form-holder"]}`}>
                <div className="form-row">
                  <div>
                    <div className="form-group pb-2 mb-3">
                      <br />
                      <small className="text-muted d-block">Max size 1mb</small>
                      <label className="btn btn-outline-info">
                        صورة بطاقة الهوية - ظهر
                        <input
                          onChange={handleOnPhoto2Change}
                          type="file"
                          accept="image/*"
                          className="form-control"
                          hidden
                        />
                      </label>
                    </div>
                  </div>
                  <figure className="figure">
                    <img
                      src="https://cdn.elwatannews.com/watan/610x300/9329604941555756506.jpg"
                      className="figure-img img-fluid rounded"
                      style={{ width: "150px" }}
                      alt="A generic square placeholder image with rounded corners in a figure."
                    />
                    <figcaption className="figure-caption text-right"></figcaption>
                  </figure>
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
              {showLoading()}
              {error && error}
              {success &&
                "You have successfully activated your account. Please signin."}
              <div className="col-md-4">
                <button onClick={clickSubmit} className="btn btn-secondary">
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

export default withRouter(Form3);
