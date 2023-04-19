import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";
import Link from "next/link";
import classes from "../../components/user/userProfile.module.css";
import { useState, useEffect } from "react";
import { getProfile } from "../../actions/user";
import { getCookie } from "../../actions/auth";
const UserIndex = () => {
  const token = getCookie("token");
  const [user, setUser] = useState();

  const init = () => {
    getProfile(token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUser(data);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  if (!user) {
    return (
      <>
        <p>جاري التحميل...</p>
      </>
    );
  }

  const accountStatus = user.confirmed === 0 ? "تحت المراجعة" : "تم التفعيل";

  return (
    <Layout>
      <Private>
        <div className={classes["container"]}>
          <h1 className={classes["container__title"]}>البيانات العامة</h1>
          <h3 className={classes["container__text"]}>الإسم: {user.name}</h3>
          <h3 className={classes["container__text"]}>البريد: {user.email}</h3>
          <h3 className={classes["container__text"]}>
            رقم الهاتف: {user.phone}
          </h3>
          <h3 className={classes["container__text"]}>
            حالة الحساب: {accountStatus}
          </h3>
          <div className={classes["actionsContainer"]}>
            <div style={{ textAlign: "center" }}>
              {user.role === 1 ? (
                <>
                  <Link
                    style={{ textDecoration: "none" }}
                    href="/user/crud/blog"
                  >
                    <button className={`${classes["submit"]}`}>
                      مقالة جديدة
                    </button>
                  </Link>

                  <Link
                    style={{ textDecoration: "none" }}
                    href="/user/crud/blogs"
                  >
                    <button className={`${classes["submit"]}`}>
                      تعديل المقالات
                    </button>
                  </Link>

                  <Link
                    style={{ textDecoration: "none" }}
                    href="/admin/crud/category-tag"
                  >
                    <button className={`${classes["submit"]}`}>
                      تعديل الأقسام 
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href={"/user/update"}>
                    <button className={`${classes["submit"]}`}>
                      تعديل البيانات
                    </button>
                  </Link>

                  <button className={`${classes["submit"]}`}>
                    تعطيل الحساب
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default UserIndex;
