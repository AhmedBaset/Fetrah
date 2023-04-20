import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { signin, authenticate, isAuth } from "../../../actions/auth";
import Link from "next/link";
import Image from "next/image";

import classes from "./Signin.module.css";

const SigninComponent = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      const result = await isAuth();
      setCurrentUser(result);
      if (result) {
        router.replace("/");
      }
    };
    fetchUser();
  }, []);

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };
    signin(user).then(async (data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // save user token to cookie
        // save user info to local storage
        // authenticate user

        authenticate(data, () => {
          isAuth().then((result) => {
            if (result && result.role === 1) {
              router.replace("/admin");
            } else {
              router.replace("/user");
            }
          });
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
        <div className="text-center">برجاء الانتظار</div>
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
  const showMessage = () =>
    message ? (
      <div className="alert alert-info" role="alert">
        <div className="text-center">{message}</div>
      </div>
    ) : (
      ""
    );

  const newSigninForm = () => {
    return (
      <>
        <div className={classes.container}>
          <form className={classes["form-container"]} onSubmit={handleSubmit}>
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
            <Link href={`/auth/password/forgot`}>
              <p
                style={{
                  marginTop: "4rem",
                  textAlign: "center",
                  color: "#A7727D",
                  textDecoration: "underline",
                }}
                className={`${classes["input-label"]}`}
              >
                يمكنك استعادة كلمة السر من هنا
              </p>
            </Link>
          </form>
          <div className={`${classes["image"]}`}>
            <img src="/images/muslim.svg" alt="لتسكنوا" />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {showForm && newSigninForm()}
      {showError()}
      {showLoading()}
      {showMessage()}
    </>
  );
};

export default SigninComponent;
