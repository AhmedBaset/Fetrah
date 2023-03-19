import React from "react";
import Layout from "../components/Layout";
import SigninComponent from "../components/auth/Signin/SigninComponent";
import { withRouter } from "next/router";

const SignIn = ({ router }) => {
  const showRedirectMessage = () => {
    if (router.query.message) {
      return <div className="alert alert-danger">{router.query.message}</div>;
    } else {
      return;
    }
  };
  return (
    <Layout>
      <div className="row justify-content-md-center m-0">
        <div className="col-md-5">
        {showRedirectMessage()}
        </div>
      </div>
      <div className="row justify-content-md-center m-0">
        <div className="col-md-5">
          <SigninComponent />
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(SignIn);
