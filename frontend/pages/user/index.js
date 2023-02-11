import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";
import Link from "next/link";


const UserIndex = () => {
  return (
    <Layout>
      <Private>
        <div className="row">
          <div className="col-md-12 pt-5 pb-5">
            <h2>Admin Page</h2>
          </div>
          <div className="col-md-4">
            <ul className="list-group">
              <li className="list-group-item">
                <Link style={{ textDecoration: "none" }} href="/user/crud/blog">
                  Create Blog
                </Link>
              </li>
              <li className="list-group-item">
                <Link
                  style={{ textDecoration: "none" }}
                  href="/user/crud/blogs"
                >
                  Update/Delete Blog
                </Link>
              </li>
              <li className="list-group-item">
                <Link
                  style={{ textDecoration: "none" }}
                  href="/user/update"
                >
                  Profile update
                </Link>
              </li>

            </ul>
          </div>
          <div className="col-md-8">Right</div>
        </div>
      </Private>
    </Layout>
  );
};

export default UserIndex;
