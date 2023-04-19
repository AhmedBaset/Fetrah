import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { preSignup, isAuth } from "../../../actions/auth";
import { Button, ButtonGroup } from "reactstrap";
import classes from "./Signup.module.css";

const SignupComponent = () => {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState("");
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
    gender: "",
    name: "",
    email: "",
    phone: "",
    password: "",
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
    const finalPhoneNumber = countryCode + phone;
    const user = { gender, name, email, password, phone: finalPhoneNumber };
    console.log(user);
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

  const selectRef = useRef(null);

  const handleDropdownChange = () => {
    setCountryCode(selectRef.current.value);
    console.log(selectRef.current.value);
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

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

  const newSignupForm = () => {
    return (
      <div className={`${classes["container"]}`}>
        <form className={classes["signup-form"]} onSubmit={handleSubmit}>
          <h1 className={`${classes["title"]}`}>تسجيل حساب جديد</h1>

          <div className={`${classes["form-container"]}`}>
            <div
              style={{
                width: "18rem",
                textAlign: "end",
              }}
            >
              <label className={classes["input-label"]}>*من انت</label>
            </div>
            <div
              style={{
                width: "18rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              className="btn-group"
            >
              <li className="list-unstyled ">
                <ButtonGroup>
                  <Button
                    className={`${classes["gender-btn"]}`}
                    outline
                    onClick={() => setValues({ ...values, gender: "woman" })}
                    active={gender === "woman"}
                  >
                    انا فتاة
                  </Button>
                </ButtonGroup>
              </li>
              <li className="list-unstyled">
                <ButtonGroup>
                  <Button
                    className={`${classes["gender-btn"]}`}
                    outline
                    onClick={() => setValues({ ...values, gender: "man" })}
                    active={gender === "man"}
                  >
                    أنا رجل
                  </Button>
                </ButtonGroup>
              </li>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <div className={classes["input-container"]}>
              <label className={classes["input-label"]}>*اسمك بالعربية</label>
              <input
                type="text"
                onChange={handleChange("name")}
                value={name}
                className={classes["input"]}
                required
              />
            </div>

            <div className={classes["input-container"]}>
              <label className={classes["input-label"]}>
                *بريدك الالكتروني
              </label>
              <input
                type="text"
                onChange={handleChange("email")}
                value={email}
                className={classes["input"]}
                required
              />
            </div>
            <div className={`${classes["input-container"]}`}>
              <label className={classes["input-label"]}>*رقم الهاتف</label>
              <div className={classes["phonInputContainer"]}>
                <select
                  ref={selectRef}
                  onChange={handleDropdownChange}
                  className={classes["country-codes"]}
                  required={true}
                >
                  <option value="">اختر بلدك</option>
                  <option value="20">(20+) مصر</option>
                  <option value="212">(212+) المغرب</option>
                  <option value="213">(213+) الجزائر</option>
                  <option value="216">(216+) تونس</option>
                  <option value="218">(218+) ليبيا</option>
                  <option value="249">(249+) السودان</option>
                  <option value="961">(961+) لبنان</option>
                  <option value="962">(962+) الأردن</option>
                  <option value="963">(963+) سوريا</option>
                  <option value="964">(964+) العراق</option>
                  <option value="966">(966+) الجزيرة العربية</option>
                  <option value="967">(967+) اليمن</option>
                  <option value="970">(970+) فلسطين</option>
                  <option value="971">(971+) الإمارات</option>
                  <option value="965">(965+) الكويت</option>
                  <option value="973">(973+) البحرين</option>
                  <option value="974">(974+) قطر</option>
                </select>
                <input
                  type="tel"
                  onChange={handleChange("phone")}
                  value={phone}
                  className={classes["phonInput"]}
                  required
                />
              </div>
            </div>

            <div className={classes["input-container"]}>
              <label className={classes["input-label"]}>*كلمة السر</label>
              <input
                type="password"
                onChange={handleChange("password")}
                value={password}
                className={classes["input"]}
                required
              />
            </div>

            <div className={`${classes["submit-parent"]}`}>
              <button className={classes["submit"]} type="submit">
                تسـجيل الدخول
              </button>
            </div>
          </div>
        </form>
        <div className={classes["image"]}>
          <img src={`/images/muslim.svg`} alt="لتسكنوا" />
        </div>
      </div>
    );
  };

  return (
    <>
      {showForm && newSignupForm()}
      {showError()}
      {showLoading()}
      {showMessage()}
    </>
  );
};

export default SignupComponent;
