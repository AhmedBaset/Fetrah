import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import Layout from "../../components/Layout";
import { useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
const ReactDOMServer = require("react-dom/server");
const HtmlToReactParser = require("html-to-react").Parser;
import Card from "../../components/blog/Card";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import classes from "../../components/blog/Card.module.css";
const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogLimit,
  blogSkip,
  router,
}) => {
  const htmlToReactParser = new HtmlToReactParser();

  const head = () => {
    const title = `مقالات توعوية حول الزواج | ${APP_NAME}`;
    return (
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="تعلم كيف تختار زوجتك وما هي أسئلة فترة الخطوبة"
        />
        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta property="og:title" content={`تزوج لتسكن | ${APP_NAME}`} />
        <meta
          name="og:description"
          content="الزواج سنة النبي صلى الله عليه وسلم"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />

        <meta property="og:image" content={`${DOMAIN}/images/logo.png`} />
        <meta
          property="og:image:secure_url"
          content={`${DOMAIN}/static/images/logo.png`}
        />
        <meta property="og:image:type" content={`image/png`} />
        <meta property="fb:app_id" content={`${FB_APP_ID}`} />
      </Head>
    );
  };

  const [limit, setLimit] = useState(blogLimit);
  const [skip, setSkip] = useState(blogSkip);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const loadMore = () => {
    let toSkip = skip + limit;
    listBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
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
          تحميل المزيد
        </button>
      )
    );
  };

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return <Card key={i} blog={blog} parser={htmlToReactParser} />;
    });
  };

  const showAllCategories = () => {
    return categories.map((c, i) => {
      return (
        <Link href={`/categories/${c.slug}`} key={i}>
          <div className="btn btn-primary me-1 ms-1 mt-3">{c.name}</div>
        </Link>
      );
    });
  };

  const showAllTags = () => {
    return tags.map((t, i) => {
      return (
        <Link href={`/tags/${t.slug}`} key={i}>
          <div className="btn btn-outline-primary me-1 ms-1 mt-3">{t.name}</div>
        </Link>
      );
    });
  };

  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, i) => (
      <div key={i}>
        <Card blog={blog} parser={htmlToReactParser} />
      </div>
    ));
  };

  const title = `لِزَوَاجٍ إِسْلَامِيٍ صَحِيح`;
  return (
    <>
      {head()}
      <Layout>
        <div className={classes["container"]}>
          <br />
          <h1>{title}</h1>
          <br />
          <div className={classes["row_container"]}>{showAllCategories()}</div>
          <br />
          <div className={classes["blogs_container"]}>
            {showAllBlogs()}
            <div>
              <div className="container-fluid">{showLoadedBlogs()}</div>
              <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 9;
  return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogLimit: limit,
        blogSkip: skip,
      };
    }
  });
};

export default withRouter(Blogs);
