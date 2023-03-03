import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { preSignup, isAuth } from "../../actions/auth";
import { Button, ButtonGroup } from "reactstrap";
const SignupComponent = () => {
  const router = useRouter();

  useEffect(() => {
    if (isAuth()) {
      router.replace("/");
    }
  }, []);

  const [values, setValues] = useState({
    gender: "",
    name: "Ahmed",
    email: "libgdxengine@gmail.com",
    phone: "01019867911",
    password: "ahmed1998",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const {
    gender,
    name,
    email,
    phone,
    password,
    error,
    loading,
    message,
    showForm,
  } = values;

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { gender, name, email, password, phone };
    preSignup(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          phone: "",
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
        <div className="btn-group">
          <li className="list-unstyled m-2">
            <ButtonGroup>
              <Button
                color="primary"
                outline
                onClick={() => setValues({ ...values, gender: "woman" })}
                active={gender === "woman"}
              >
                Woman
              </Button>
            </ButtonGroup>
          </li>
          <li className="list-unstyled m-2">
            <ButtonGroup>
              <Button
                color="primary"
                outline
                onClick={() => setValues({ ...values, gender: "man" })}
                active={gender === "man"}
              >
                Man
              </Button>
            </ButtonGroup>
          </li>
        </div>
        <div className="form-group m-3">
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
        <div className="form-group m-3">
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
        <div className="form-group m-3">
          <label htmlFor="phone">Phone</label>
          <input
            onChange={handleChange("phone")}
            type="tel"
            className="form-control"
            id="phone"
            value={phone}
            placeholder="Type your Email"
          />
        </div>
        <div className="form-group m-3">
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

        <button className="btn btn-primary m-3" type="submit">
          Signup
        </button>
      </form>
    );
  };

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && SignupForm()}
    </>
  );
};

export default SignupComponent;
