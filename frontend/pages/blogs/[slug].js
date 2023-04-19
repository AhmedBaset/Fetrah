import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { getSingleBlog, listRelatedBlogs } from "../../actions/blog";
const ReactDOMServer = require("react-dom/server");
const HtmlToReactParser = require("html-to-react").Parser;
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import classes from "../../styles/SingleBlog.module.css";
import moment from "moment/moment";
import SmallCard from "../../components/blog/SmallCard";

const SingleBlog = ({ blog, query }) => {
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const loadRelated = () => {
    listRelatedBlogs({ blog }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelatedBlogs(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
  }, [query]);

  const htmlToReactParser = new HtmlToReactParser();
  const blogBody = htmlToReactParser.parse(blog.body);

  const head = () => {
    const title = `${blog.title} | ${APP_NAME}`;
    return (
      <Head>
        <title>{title}</title>
        <meta name="description" content={`${blog.mDescription}`} />
        <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
        <meta property="og:title" content={`${title} | ${APP_NAME}`} />
        <meta name="og:description" content={`${blog.mDescription}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />

        <meta
          property="og:image"
          content={`${API}/api/blog/photo/${blog.slug}`}
        />
        <meta
          property="og:image:secure_url"
          content={`${API}/api/blog/photo/${blog.slug}`}
        />
        <meta property="og:image:type" content={`image/jpg`} />
        <meta property="fb:app_id" content={`${FB_APP_ID}`} />
      </Head>
    );
  };

  const showBlogCategories = (blog) => {
    return blog.categories.map((category, i) => {
      return (
        <Link key={i} href={`/categories/${category.slug}`}>
          <p className="btn btn-primary mr-1 ms-1 mt-1">{category.name}</p>
        </Link>
      );
    });
  };

  const showBlogTags = (tag) => {
    return blog.tags.map((tag, i) => {
      return (
        <Link key={i} href={`/tags/${tag.slug}`}>
          <p className="btn btn-outline-primary mr-1 ms-1 mt-1">{tag.name}</p>
        </Link>
      );
    });
  };

  const showRelatedBlogs = () => {
    return (
      <>
        {relatedBlogs.length > 0 && (
          <p style={{ fontSize: "30px" }}>مقالات ذات صلة</p>
        )}
        {relatedBlogs.map((blog, i) => {
          return (
            <div className="col-md-4" key={i}>
              <article>
                <SmallCard blog={blog} parser={htmlToReactParser} />
              </article>
            </div>
          );
        })}
      </>
    );
  };

  const showComments = () => {
    return <div>Show Comments</div>;
  };

  return (
    <>
      {head()}
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section>
                <div
                  className="row justify-content-center align-items-center g-2"
                  style={{ marginTop: "-30px" }}
                >
                  <img
                    src={`${API}/api/blog/photo/${blog.slug}`}
                    alt={`${blog.title}`}
                    className={`img img-fluid ${classes.featuredImage}`}
                  />
                </div>
              </section>
              <section>
                <div className="container-fluid">
                  <h1 className="display-2 pb-3 text-center fw-bold pt-3">
                    {blog.title}
                  </h1>
                  <p className="lead mt-3 mark">
                    {/* Written by <Link href={`/profile/${blog.postedBy.username}`}>{blog.postedBy.username}</Link> | Published{" "}
                    {moment(blog.updatedAt).fromNow()} */}
                  </p>
                  <div className="pb-3">
                    {showBlogCategories(blog)}
                    {showBlogTags(blog)}
                    <br />
                    <br />
                  </div>
                </div>
              </section>
            </div>

            <div className="container">
              <section>
                <div className="col-md-12 lead">{blogBody}</div>
              </section>
            </div>

            <br />
            <br />
            <br />
            <br />
            <div className="container pb-5">
              <div className="row">{showRelatedBlogs()}</div>
              <br />
            </div>

            <div className="container pb-5">{/* {showComments()} */}</div>
          </article>
        </main>
      </Layout>
    </>
  );
};

SingleBlog.getInitialProps = ({ query }) => {
  return getSingleBlog(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blog: data,
        query,
      };
    }
  });
};

export default SingleBlog;
