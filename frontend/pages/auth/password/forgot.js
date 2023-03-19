import { useState } from 'react';
import Layout from '../../../components/Layout';
import { forgotPassword } from '../../../actions/auth';

const ForgotPassword = () => {
    const [values, setValues] = useState({
        email: '',
        message: '',
        error: '',
        showForm: true
    });

    const { email, message, error, showForm } = values;

    const handleChange = name => e => {
        setValues({ ...values, message: '', error: '', [name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, message: '', error: '' });
        console.log(email);
        forgotPassword({ email }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, message: data.message, email: '', showForm: false });
            }
        });
    };

    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-success">{message}</div> : '');

    const passwordForgotForm = () => (
        <form style={{width: "30rem", textAlign: "center"}} onSubmit={handleSubmit}>
            <div>
                <input
                    type="email"
                    onChange={handleChange('email')}
                    className="forgetInput"
                    value={email}
                    placeholder="اكتب بريدك الالكتروني هنا"
                    required
                />
            </div>
            <div>
                <button style={{marginLeft: "1rem", marginRight: "1rem"}} className="submit">استعادة</button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="mt-5">
                <h2 style={{textAlign: "center"}}>استعادة كلمة السر</h2>
                <hr />
                {showError()}
                {showMessage()}
                {showForm && passwordForgotForm()}
            </div>
        </Layout>
    );
};

export default ForgotPassword;