import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import BlogCreate from "../../../components/crud/BlogCreate";
import Link from "next/link";
import ReadBlogs from "../../../components/crud/ReadBlogs";


const Blogs = () => {
  return (
    <Layout>
      <Admin>
        <div className="row m-2">
          <div className="col-md-6 pt-5 pb-5">
            <h2>Manage blogs</h2>
          </div>
          <div className="col-md-12">
            <ReadBlogs />
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blogs;
