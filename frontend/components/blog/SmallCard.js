import moment from "moment/moment";
import { API } from "../../config";
import Link from "next/link";

const SmallCard = ({ blog, parser }) => {
  const blogExcerpt = parser.parse(blog.excerpt);

  return (
    <div className="card">
      <section>
        <Link href={`/blogs/${blog.slug}`}>
          <>
            <img
              className="img img-fluid"
              height="400"
              width="300"
              style={{
                height: "200px",
                maxHeight: "200px",
                width: "100%",
                objectFit: "contain",
              }}
              alt=""
              src={`${API}/api/blog/photo/${blog.slug}`}
            />
          </>
        </Link>
      </section>
      <div className="card-body">
        <section>
          <Link style={{ textDecoration: "none" }} href={`/blogs/${blog.slug}`}>
            <h5 className="card-title">{blog.title}</h5>
          </Link>
          <p className="card-text">{blogExcerpt}</p>
        </section>
      </div>
      <div className="card-body">
        Posted {moment(blog.updatedAt).fromNow()} by{" "}
        <Link style={{ textDecoration: "none" }} className="float-start link-primary" href={`/`}>
          {blog.postedBy.username}
        </Link>
      </div>
    </div>
  );
};

export default SmallCard;
