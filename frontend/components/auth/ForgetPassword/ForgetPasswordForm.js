import { useState } from "react";
import { forgotPassword } from "../../../actions/auth";
import classes from "./ForgetPassword.module.css";

const ForgotPasswordForm = (props) => {
  const [values, setValues] = useState({
    email: "",
    message: "",
    error: "",
    showForm: true,
  });

  const { email, message, error, showForm } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, message: "", error: "", [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, message: "", error: "" });
    console.log(email);
    forgotPassword({ email }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          message: data.message,
          email: "",
          showForm: false,
        });
      }
    });
  };

  const showError = () =>
    error ? (
      <div className="alert alert-danger">
        <p className="text-center">{error}</p>
      </div>
    ) : (
      ""
    );
  const showMessage = () =>
    message ? (
      <div className="alert alert-success">
        <p className="text-center">{message}</p>
      </div>
    ) : (
      ""
    );

  const showForgetPassword = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form
          style={{ width: "18rem", textAlign: "center" }}
          onSubmit={handleSubmit}
        >
          <div>
            <input
              type="email"
              onChange={handleChange("email")}
              className={classes['input']}
              value={email}
              placeholder="اكتب بريدك الالكتروني هنا"
              required
            />
          </div>
          <div>
            <button
              style={{ marginLeft: "1rem", marginRight: "1rem" }}
              className={classes['submit']}
            >
              استعادة
            </button>
          </div>
        </form>
      </div>
    );
  };
  return (
    <div className="mt-5">
      <h2 style={{ textAlign: "center" }}>استعادة كلمة السر</h2>
      <hr />
      {showError()}
      {showMessage()}
      <div>{showForm && showForgetPassword()}</div>
    </div>
  );
};

export default ForgotPasswordForm;
