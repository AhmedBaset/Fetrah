import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { signin, authenticate, isAuth } from "../../../actions/auth";
import Link from "next/link";
import Image from "next/image";

import classes from "./Signin.module.css";

const SigninComponent = () => {
  const router = useRouter();

  useEffect(() => {
    if (isAuth()) {
      router.replace("/");
    }
  }, []);

  const [values, setValues] = useState({
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
    const user = { email, password };
    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // save user token to cookie
        // save user info to local storage
        // authenticate user
        authenticate(data, () => {
          if (isAuth() && isAuth.role === 1) {
            router.replace("/admin");
          } else {
            router.replace("/user");
          }
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const { email, password, error, loading, message, showForm } = values;

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

  const SigninForm = () => {
    return (
      <form onSubmit={handleSubmit}>
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
          Signin
        </button>
      </form>
    );
  };

  const newSigninForm = () => {
    return (
      <>
        <div className={classes.container}>
          <form onSubmit={handleSubmit}>
            <h1 className={classes.title}>تسجيل الدخول</h1>
            <div className={`${classes["input-container"]}`}>
              <label className={`${classes["input-label"]}`}>
                *بريدك الالكتروني
              </label>
              <input
                type="email"
                onChange={handleChange("email")}
                className={`${classes["input"]}`}
                value={email}
                required
              />
            </div>
            <div className={`${classes["input-container"]}`}>
              <label className={`${classes["input-label"]}`}>*كلمة السر</label>
              <input
                onChange={handleChange("password")}
                type="password"
                value={password}
                className={`${classes["input"]}`}
                required
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <button className={`${classes["submit"]}`}>تسجيل الدخول</button>
            </div>
          </form>
          <div className={`${classes["image"]}`}>
            <img
              style={{ width: "20rem", height: "20rem" }}
              src="/images/muslim.svg"
              alt="لتسكنوا"
            />
          </div>
        </div>
        <Link href={`/auth/password/forgot`}>
          <p
            style={{
              textAlign: "center",
              color: "#A7727D",
              textDecoration: "underline",
            }}
            className={`${classes["input-label"]}`}
          >
            يمكنك استعادة كلمة السر من هنا
          </p>
        </Link>
      </>
    );
  };

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && newSigninForm()}
    </>
  );
};

export default SigninComponent;
