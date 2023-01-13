import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { signin, authenticate, isAuth } from "../../actions/auth";

const SigninComponent = () => {
  const router = useRouter();
  
  useEffect(() => {
    if(isAuth()){
      router.replace('/');
    }
  } ,[])

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
        console.log("");
        authenticate(data, () => {
          if(isAuth() && isAuth.role === 1){
            router.replace('/admin');
          }else{
            router.replace('/user');
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

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && SigninForm()}
    </>
  );
};

export default SigninComponent;
