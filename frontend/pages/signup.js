import Link from 'next/link';
import React from 'react';
import SignupComponent from '../components/auth/SignupComponent';
import Layout from '../components/Layout';

const Signup = () => {
    return (
        <Layout>
            <h1>Sign up</h1>
            <SignupComponent />
        </Layout>
    );
};

export default Signup;