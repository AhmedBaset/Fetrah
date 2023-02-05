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
                <Link href="/admin/crud/category-tag">Create Ctegory</Link>
              </li>
              <li className="list-group-item">
                <Link href="/admin/crud/category-tag">Create Tag</Link>
              </li>
              <li className="list-group-item">
                <Link href="/admin/crud/blog">Create Blog</Link>
              </li>
              {/* <li className="list-group-item">Item two </li>
              <li className="list-group-item">Item three </li>
              <li className="list-group-item">Item four </li>
              <li className="list-group-item">Item five </li> */}
            </ul>
          </div>
          <div className="col-md-8">Right</div>
        </div>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
