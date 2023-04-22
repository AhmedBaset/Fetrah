import Layout from "../../components/Layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getUsers } from "../../actions/user";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import ManUserCard from "../../components/search/ManUserCard";
import classes from "../../components/search/ManUserCard.module.css";
import Image from "next/image";
import { isAuth } from "../../actions/auth";
import WomanUserCard from "../../components/search/WomanUserCard";
import Pagination from "../../components/search/Pagination";
import { useRouter } from "next/router";
import { STATES } from "../../constants";

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

const UsersPage = ({ users, totalUsers, numberOfPages, currentPageNumber }) => {
  const router = useRouter();
  const [loadedUsers, setLoadedUsers] = useState(users);
  const showAllUsers = () => {
    return loadedUsers.map((user, i) => {
      return (
        <div key={i} className={classes.userCard}>
          {user.gender === "man" ? (
            <ManUserCard user={user} />
          ) : (
            <WomanUserCard user={user} />
          )}
        </div>
      );
    });
  };

  const [filterQuery, setFilterQuery] = useState("");

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedNationality, setSelectedNationality] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const handleGenderFilterClick = (genderValue) => {
    setSelectedGender(genderValue);
    window.location.href = `/users?g=${genderValue}`;
    setFilterQuery("");
  };

  const handleSearchClick = (e) => {
    console.log(filterQuery);
    const stringParameters = Object.entries(filterQuery).map(
      ([key, value]) => `${key}=${value}`
    );
    stringParameters.push(`g=${selectedGender}`);
    console.log(stringParameters);
    window.location.href = `${router.pathname}?${stringParameters.join("&")}`;
  };

  useEffect(() => {
    const { g, s, c, n, t } = router.query;
    //this handles the state after the page reloads
    setSelectedGender(g ? g : "woman");
    setSelectedStatus(s ? s : "الحالة");
    setSelectedCountry(c ? c : "الإقامة");
    setSelectedNationality(n ? n : "الجنسية");
    setSelectedState(t ? t : "المحافظة");

    const filter = {};

    if (s) {
      filter.s = s;
    }
    if (c) {
      filter.c = c;
    }
    if (n) {
      filter.n = n;
    }
    if (t) {
      filter.t = t;
    }
    setFilterQuery(filter);
  }, [router.query]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    let parameter = null;
    if (name === "generalStatus") {
      parameter = "s";
      setSelectedStatus(value);
    } else if (name === "country") {
      parameter = "c";
      setSelectedCountry(value);
    } else if (name === "nationality") {
      parameter = "n";
      setSelectedNationality(value);
    } else if (name === "state") {
      parameter = "t";
      setSelectedState(value);
    }

    setFilterQuery((prevQuery) => {
      return { ...prevQuery, [parameter]: value };
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
              <Image
                onClick={handleSearchClick}
                className={classes["searchImg"]}
                src={"/images/search_icon.svg"}
                width={30}
                height={30}
                alt={""}
              />
              <li>
                <select
                  className={classes["dropdown"]}
                  name="generalStatus"
                  value={selectedStatus}
                  onChange={handleInputChange}
                  required={true}
                >
                  <option value="">الحالة </option>
                  {selectedGender === "man" ? (
                    <>
                      <option value="أعزب">أعزب</option>
                      <option value="متزوج">متزوج</option>
                      <option value="مطلق">مطلق</option>
                      <option value="أرمل">أرمل</option>
                    </>
                  ) : (
                    <>
                      <option value="عزباء">عزباء</option>
                      <option value="مطلقة">مطلقة</option>
                      <option value="أرملة">أرملة</option>
                    </>
                  )}
                </select>
              </li>
              <li>
                <select
                  className={classes["dropdown"]}
                  name="nationality"
                  value={selectedNationality}
                  onChange={handleInputChange}
                  // className={classes["dropdown"]}
                  required={true}
                >
                  <option value="">الجنسية</option>
                  <option value="مصر">مصر</option>
                  <option value="المغرب">المغرب</option>
                  <option value="الجزائر">الجزائر</option>
                  <option value="تونس">تونس</option>
                  <option value="ليبيا">ليبيا</option>
                  <option value="السودان">السودان</option>
                  <option value="لبنان">لبنان</option>
                  <option value="الأردن">الأردن</option>
                  <option value="سوريا">سوريا</option>
                  <option value="العراق">العراق</option>
                  <option value="الجزيرة العربية">الجزيرة العربية</option>
                  <option value="اليمن">اليمن</option>
                  <option value="فلسطين">فلسطين</option>
                  <option value="الإمارات">الإمارات</option>
                  <option value="الكويت">الكويت</option>
                  <option value="البحرين">البحرين</option>
                  <option value="قطر">قطر</option>
                  <option value="تركيا">تركيا</option>
                </select>
              </li>
              <li>
                <select
                  className={classes["dropdown"]}
                  name="country"
                  value={selectedCountry}
                  onChange={handleInputChange}
                  // className={classes["dropdown"]}
                  required={true}
                >
                  <option value="">الإقامة</option>
                  <option value="مصر">مصر</option>
                  <option value="المغرب">المغرب</option>
                  <option value="الجزائر">الجزائر</option>
                  <option value="تونس">تونس</option>
                  <option value="ليبيا">ليبيا</option>
                  <option value="السودان">السودان</option>
                  <option value="لبنان">لبنان</option>
                  <option value="الأردن">الأردن</option>
                  <option value="سوريا">سوريا</option>
                  <option value="العراق">العراق</option>
                  <option value="الجزيرة العربية">الجزيرة العربية</option>
                  <option value="اليمن">اليمن</option>
                  <option value="فلسطين">فلسطين</option>
                  <option value="الإمارات">الإمارات</option>
                  <option value="الكويت">الكويت</option>
                  <option value="البحرين">البحرين</option>
                  <option value="قطر">قطر</option>
                  <option value="تركيا">تركيا</option>
                </select>
              </li>
              <li>
                <select
                  className={classes["dropdown"]}
                  name="state"
                  value={selectedState}
                  onChange={handleInputChange}
                  // className={classes["dropdown"]}
                  required={true}
                >
                  <option value="">المحافظة</option>
                  {selectedCountry !== "الإقامة" &&
                    selectedCountry !== "" &&
                    STATES[selectedCountry].map((state) => {
                      return <option value={state}>{state}</option>;
                    })}
                </select>
              </li>
            </ul>
            <div className={classes.container}>
              <div className={classes.gender}>
                <div
                  onClick={() => {
                    handleGenderFilterClick("woman");
                  }}
                  className={
                    selectedGender === "woman"
                      ? classes.selected
                      : classes.deselected
                  }
                >
                  نساء
                </div>
                <div
                  onClick={() => {
                    handleGenderFilterClick("man");
                  }}
                  className={
                    selectedGender === "man"
                      ? classes.selected
                      : classes.deselected
                  }
                >
                  رجال
                </div>
              </div>
              <div className={classes.result}>
                {users.length === 0 && (
                  <>
                    <div
                      style={{
                        width: "100vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <p>لا توجد نتائج لهذا البحث</p>
                    </div>
                  </>
                )}
                {users && showAllUsers()}
              </div>
            </div>

            <br />
            <br />
            <br />
            <br />
          </div>
          <div className={classes["pagination"]}>
            <Pagination
              currentPage={currentPageNumber}
              totalPages={numberOfPages}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  let pageSize = 20;
  const pageNumber = context.query.p ? context.query.p : 1;
  const gender = context.query.g ? context.query.g : "woman";
  const status = context.query.s ? context.query.s : "";
  const country = context.query.c ? context.query.c : "";
  const nationality = context.query.n ? context.query.n : "";
  const state = context.query.t ? context.query.t : "";

  return getUsers(
    pageNumber,
    pageSize,
    gender,
    status,
    country,
    nationality,
    state
  ).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        props: {
          users: data.users,
          totalUsers: data.size,
          numberOfPages: data.size / pageSize,
          currentPageNumber: pageNumber,
        },
      };
    }
  });
}

export default UsersPage;
