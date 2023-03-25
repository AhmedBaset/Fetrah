import Layout from "../../components/Layout";
import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import { useState } from "react";
import { getUsers } from "../../actions/user";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import { NavItem, NavLink } from "reactstrap";
import ManUserCard from "../../components/search/ManUserCard";
import classes from "../../components/search/ManUserCard.module.css";
import Image from "next/image";

const head = () => {
  const title = `islamic mirrage | ${APP_NAME}`;
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="this is static content for all blogs | hard coded content"
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`Latest mirrage website | ${APP_NAME}`}
      />
      <meta
        name="og:description"
        content="this is static content for all blogs | hard coded content"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`${DOMAIN}/images/website_logo.jpg`} />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/images/datasci.jpg`}
      />
      <meta property="og:image:type" content={`image/jpg`} />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );
};

const UsersPage = ({ users, totalUsers, usersLimit, usersSkip, router }) => {
  const [limit, setLimit] = useState(usersLimit);
  const [skip, setSkip] = useState(usersSkip);
  const [size, setSize] = useState(totalUsers);
  const [loadedUsers, setLoadedUsers] = useState([]);

  const loadMore = () => {
    let toSkip = skip + limit;
    getUsers(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedUsers, ...data.users]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
          Load more
        </button>
      )
    );
  };

  const showAllUsers = () => {
    return users.map((user, i) => {
      return (
        <div key={i} className={classes.userCard}>
          <ManUserCard user={user} />
        </div>
      );
    });
  };
  return (
    <>
      <Layout>
        <div className="row-md-12">
          <div className={classes["search-head"]}>
            <div className={classes["container"]}>
              <p>بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ</p>
              <div className={classes["search-divider"]}></div>
              <h3>
                وَأَنْكِحُوا الْأَيَامَى مِنْكُمْ وَالصَّالِحِينَ مِنْ
                عِبَادِكُمْ وَإِمَائِكُمْ إِنْ يَكُونُوا فُقَرَاءَ يُغْنِهِمُ
                اللَّهُ مِنْ
                <br /> فَضْلِهِ وَاللَّهُ وَاسِعٌ عَلِيمٌ
              </h3>
            </div>
          </div>
          <div className={classes["search-result"]}>
            <ul>
              <Image className={classes['searchImg']} src={"/images/search_icon.svg"} width={30} height={30} alt={""}/>
              <li>
                <select
                  className={classes["dropdown"]}
                  name="generalStatus"
                  // value={formData.generalStatus}
                  // onChange={handleInputChange}
                  // className={classes["dropdown"]}
                  required={true}
                >
                  <option value="">الحالة </option>
                  <option value="أعزب">أعزب</option>
                  <option value="متزوج">متزوج</option>
                  <option value="مطلق">مطلق</option>
                  <option value="أرمل">أرمل</option>
                </select>
              </li>
              <li>
                <select
                  className={classes["dropdown"]}
                  name="generalStatus"
                  // value={formData.generalStatus}
                  // onChange={handleInputChange}
                  // className={classes["dropdown"]}
                  required={true}
                >
                  <option value="">الجنسية</option>
                  <option value="أعزب">مصر</option>
                  <option value="متزوج">سوريا</option>
                  <option value="مطلق">العراق</option>
                  <option value="أرمل">اليمن</option>
                </select>
              </li>
              <li>
                <select
                  className={classes["dropdown"]}
                  name="generalStatus"
                  // value={formData.generalStatus}
                  // onChange={handleInputChange}
                  // className={classes["dropdown"]}
                  required={true}
                >
                  <option value="">بلد الإقامة</option>
                  <option value="أعزب">مصر</option>
                  <option value="متزوج">سوريا</option>
                  <option value="مطلق">العراق</option>
                  <option value="أرمل">اليمن</option>
                </select>
              </li>
              <li>
                <select
                  className={classes["dropdown"]}
                  name="generalStatus"
                  // value={formData.generalStatus}
                  // onChange={handleInputChange}
                  // className={classes["dropdown"]}
                  required={true}
                >
                  <option value="">المحافظة</option>
                  <option value="أعزب">مصر</option>
                  <option value="متزوج">سوريا</option>
                  <option value="مطلق">العراق</option>
                  <option value="أرمل">اليمن</option>
                </select>
              </li>
            </ul>
            <div className={classes.container}>
              <div className={classes.gender}>
                <div className={classes.female}>نساء</div>
                <div className={classes.male}>رجال</div>
              </div>
              <div className={classes.result}>{users && showAllUsers()}</div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

UsersPage.getInitialProps = () => {
  let skip = 0;
  let limit = 2;
  return getUsers(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        users: data.users,
        totalUsers: data.size,
        usersLimit: limit,
        usersSkip: skip,
      };
    }
  });
};

export default UsersPage;
