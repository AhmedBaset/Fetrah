import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import ConfirmationsList from "../../../components/crud/ConfirmationsList";

const RejectedConfirmations = () => {
  return (
    <Layout>
      <Admin>
        <div className="row m-2">
          <div className="col-md-6 pt-5 pb-5">
            <h2>ادارة طلبات التسجيل</h2>
          </div>
          <div className="col-md-12">
            <ConfirmationsList />
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default RejectedConfirmations;
