import React from "react";
import Layout from "../components/Layout";
import SigninComponent from "../components/auth/SigninComponent";

const SignIn = () => {
  return (
    <Layout>
      <h1 className="text-center pt-4 pb-4">Sign in</h1>

      <div className="row justify-content-md-center">
        <div className="col-md-5">
          <SigninComponent />
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
