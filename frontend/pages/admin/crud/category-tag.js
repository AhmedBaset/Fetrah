import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import Link from "next/link";
import Category from "../../../components/crud/Category";
import Tag from "../../../components/crud/Tag";

const CategoryTag = () => {
  return (
    <Layout>
      <Admin>
        <div className="row m-2">
          <div className="col-md-12 pt-5 pb-5">
            <h2>ادارة الأقسام والعناوين</h2>
          </div>
          <div className="col-md-6">
            <h1>اضافة قسم</h1>
            <Category />
          </div>
          <div className="col-md-6">
            <h1>إضافة موضوع</h1>
            <Tag />
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default CategoryTag;
