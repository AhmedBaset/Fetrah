import ContactForm from "../components/form/ContactForm";
import Layout from "../components/Layout";
const Contact = () => {
  return (
    <Layout>
      <div className="contaienr-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h2>Contact form</h2>
            <hr />
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
