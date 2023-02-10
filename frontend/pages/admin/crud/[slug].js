import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import ReadBlogs from "../../../components/crud/ReadBlogs";
import Link from "next/link";
import BlogUpdate from "../../../components/crud/BlogUpdate";

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <div className="row m-2">
            <div className="col-md-6 pt-5 pb-5">
              <h2>Update blogs</h2>
            </div>
            <div className="col-md-12">
              <BlogUpdate />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blog;
