import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { singleCategory } from "../../actions/category";
const ReactDOMServer = require("react-dom/server");
const HtmlToReactParser = require("html-to-react").Parser;
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import Card from "../../components/blog/Card";

const Category = ({ category, blogs, query }) => {
  const htmlToReactParser = new HtmlToReactParser();

  const showBlogs = () => {
    return blogs.map((b, i) => {
      return (
        <article key={i}>
          <Card blog={b} parser={htmlToReactParser} />
          <hr />
        </article>
      );
    });
  };

  const head = () => {
    const title = `${category.name} | ${APP_NAME}`;
    return (
      <Head>
        <title>{title}</title>
        <meta name="description" content={`Hard coded description ${category.name}`} />
        <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
        <meta property="og:title" content={`${title} | ${APP_NAME}`} />
        <meta name="og:description" content={`Hard coded description ${category.name}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />

        <meta
          property="og:image"
          content={`${DOMAIN}/images/website_logo.jpg`}
        />
        <meta
          property="og:image:secure_url"
          content={`${DOMAIN}/images/website_logo.jpg`}
        />
        <meta property="og:image:type" content={`image/jpg`} />
        <meta property="fb:app_id" content={`${FB_APP_ID}`} />
      </Head>
    );
  };

  return (
    <>
    {head()}
      <Layout>
        <main>
          <div className="container-fluid text-center">
            <header>
              <div className="col-mc-12 pt-3">
                <h1 className="display-4 fw-bold">{category.name}</h1>
              </div>
            </header>
          </div>
          <div className="container-fluid">{showBlogs()}</div>
        </main>
      </Layout>
    </>
  );
};

Category.getInitialProps = ({ query }) => {
  return singleCategory(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        category: data.category,
        blogs: data.blogs,
        query,
      };
    }
  });
};

export default Category;
