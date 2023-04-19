import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";

import Link from "next/link";
const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <div style={{ direction: "rtl" }} className="row">
          <div className="col-md-12 pt-5 pb-5 ps-5 pe-5">
            <h2>صفحة الإدارة</h2>
          </div>
          <div className="col-md-4">
            <ul className="list-group">
              <li className="list-group-item">
                <Link
                  style={{ textDecoration: "none" }}
                  href="/admin/crud/confirmations"
                >
                  طلبات التسجيل
                </Link>
              </li>
              <li className="list-group-item">
                <Link
                  style={{ textDecoration: "none" }}
                  href="/admin/crud/category-tag"
                >
                  ادارة الأقسام
                </Link>
              </li>
              <li className="list-group-item">
                <Link
                  style={{ textDecoration: "none" }}
                  href="/admin/crud/category-tag"
                >
                  ادارة العناوين
                </Link>
              </li>
              <li className="list-group-item">
                <Link
                  style={{ textDecoration: "none" }}
                  href="/admin/crud/blog"
                >
                  إنشاء مقالة
                </Link>
              </li>
              <li className="list-group-item">
                <Link
                  style={{ textDecoration: "none" }}
                  href="/admin/crud/blogs"
                >
                  تعديل أو حذف المقالات
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-8"></div>
        </div>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
