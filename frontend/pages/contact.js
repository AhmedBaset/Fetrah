import ContactForm from "../components/form/ContactForm";
import Layout from "../components/Layout";
const Contact = () => {
  return (
    <Layout>
      <div style={{ direction: "rtl" }} className="contaienr-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2 pt-3 pe-3 ps-3">
            <h2>يمكنك مراسلة الدعم من هنا</h2>
            <hr />
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
