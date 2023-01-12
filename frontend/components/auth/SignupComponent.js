import { useState } from "react";
import { signup } from "../../actions/auth";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "Ahmed",
    email: "ahmed@gmail.com",
    password: "ahmed1998",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };
    signup(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          loading: false,
          message: data.message,
          showForm: false,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const { name, email, password, error, loading, message, showForm } = values;

  const showLoading = () =>
    loading ? (
      <div className="alert alert-info" role="alert">
        Loading...
      </div>
    ) : (
      ""
    );
  const showError = () =>
    error ? (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    ) : (
      ""
    );
  const showMessage = () =>
    message ? (
      <div className="alert alert-info" role="alert">
        {message}
      </div>
    ) : (
      ""
    );

  const SignupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Name">Name</label>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            id="Name"
            value={name}
            placeholder="Type your Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Email">Email</label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            id="Email"
            value={email}
            placeholder="Type your Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Password">Password</label>
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            id="Password"
            value={password}
            placeholder="Type your Password"
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Signup
        </button>
      </form>
    );
  };

  return <>
  {showError()}
  {showLoading()}
  {showMessage()}
  {showForm && SignupForm()}
  
  </>;
};

export default SignupComponent;
