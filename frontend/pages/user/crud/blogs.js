import Layout from "../../../components/Layout";
import Private from "../../../components/auth/Private";
import BlogCreate from "../../../components/crud/BlogCreate";
import Link from "next/link";
import ReadBlogs from "../../../components/crud/ReadBlogs";
import { isAuth } from "../../../actions/auth";


const Blogs = () => {
    const username = isAuth() && isAuth().username;
  return (
    <Layout>
      <Private>
        <div className="row m-2">
          <div className="col-md-6 pt-5 pb-5">
            <h2>Manage blogs</h2>
          </div>
          <div className="col-md-12">
            <ReadBlogs username={username}/>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default Blogs;
