import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";

import Link from "next/link";
const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <div className="row">
          <div className="col-md-12 pt-5 pb-5">
            <h2>Admin Page</h2>
          </div>
          <div className="col-md-4">
            <ul className="list-group">
            <li className="list-group-item">
                <Link style={{textDecoration: "none"}} href="/admin/crud/confirmations">Confirmations</Link>
              </li>
              <li className="list-group-item">
                <Link style={{textDecoration: "none"}} href="/admin/crud/category-tag">Create Ctegory</Link>
              </li>
              <li className="list-group-item">
                <Link style={{textDecoration: "none"}} href="/admin/crud/category-tag">Create Tag</Link>
              </li>
              <li className="list-group-item">
                <Link style={{textDecoration: "none"}} href="/admin/crud/blog">Create Blog</Link>
              </li>
              <li className="list-group-item">
                <Link style={{textDecoration: "none"}} href="/admin/crud/blogs">Update/Delete Blog</Link>
              </li>
              <li className="list-group-item">
                <Link style={{textDecoration: "none"}} href="/user/update">Update profile</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-8">Right</div>
        </div>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
