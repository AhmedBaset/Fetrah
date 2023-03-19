import Link from "next/link";
import React from "react";
import SignupComponent from "../components/auth/Signup/SignupComponent";
import Layout from "../components/Layout";

const Signup = () => {
  return (
    <Layout>
      <div className="row justify-content-md-center m-0">
        <div className="col-md-6">
          <SignupComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
