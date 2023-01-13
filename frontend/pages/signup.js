import Link from "next/link";
import React from "react";
import SignupComponent from "../components/auth/SignupComponent";
import Layout from "../components/Layout";
import { Row } from "reactstrap";

const Signup = () => {
  return (
    <Layout>
      <h1 className="text-center pt-4 pb-4">Sign up</h1>

      <div className="row justify-content-md-center">
        <div className="col-md-5">
          <SignupComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
