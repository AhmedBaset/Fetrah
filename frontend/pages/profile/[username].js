import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { userPublicProfile } from "../../actions/user";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import moment from "moment/moment";
import ContactForm from '../../components/form/ContactForm';

const UserProfile = ({ user, blogs, query }) => {
  const showUserBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div key={i} className="mt-4 mb-4">
          <Link href={`/blogs/${blog.slug}`}>
            <p className="lead">{blog.title}</p>
          </Link>
        </div>
      );
    });
  };

  const head = () => {
    const title = `${user.name} | ${APP_NAME}`;
    return (
      <Head>
        <title>{title}</title>
        <meta name="description" content={`Created by ${user.username}`} />
        <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
        <meta property="og:title" content={`${title} | ${APP_NAME}`} />
        <meta name="og:description" content={`Created by ${user.username}`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${DOMAIN}/profile/${query.username}`}
        />
        <meta property="og:site_name" content={`${APP_NAME}`} />

        <meta
          property="og:image"
          content={`${DOMAIN}/images/website_logo.jpg`}
        />
        <meta
          property="og:image:secure_url"
          content={`${DOMAIN}/static/images/datasci.jpg`}
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
        <div class="container">
          <div class="row justify-content-center align-items-center g-2">
            <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                  <div class="row  align-items-center g-2">
                    <div class="col-md-8">
                      <h5>{user.name}</h5>
                      <p className="text-muted">
                        Joined {moment(user.createdAt).fromNow()}
                      </p>
                    </div>
                    <div className="col-md-2"></div>
                    <div class="col-md-2">
                      <img
                        src={`${API}/api/user/photo/${user.username}`}
                        className="img img-fluid img-thumbnail mb-3"
                        style={{ maxHeight: "200px", maxWidth: "100%" }}
                        alt="user profile"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />

        <div class="container pb-5">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title bg-primary pt-4 pb-4 pe-4 ps-4 text-white">{`Recent blogs by ${user.name}`}</h5>
                  <br />
                  {showUserBlogs()}
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title bg-primary pt-4 pb-4 pe-4 ps-4 text-white">{`Message ${user.name}`}</h5>
                  <br />
                  <ContactForm authorEmail={user.email} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

UserProfile.getInitialProps = ({ query }) => {
  return userPublicProfile(query.username).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        user: data.user,
        query,
      };
    }
  });
};

export default UserProfile;
