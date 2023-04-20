import moment from "moment/moment";
import { API } from "../../config";
import Link from "next/link";
import classes from "./Card.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import Image from "next/image";

const Card = ({ blog, parser }) => {
  const router = useRouter();
  const [blogExcerpt, setBlogExcerpt] = useState();

  useEffect(() => {
    setBlogExcerpt(parser.parse(blog.excerpt));
  }, []);

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

  return (
    <>
      <div
        onClick={() => {
          router.push(`/blogs/${blog.slug}`);
        }}
        className={classes["card"]}
      >
        <img
          className="img img-fluid"
          // height="400"
          // width="300"
          // style={{ maxHeight: "150px", width: "auto" }}
          alt=""
          src={`${API}/api/blog/photo/${blog.slug}`}
        />
        <div className={classes["card-content"]}>
          <h2 className={classes["article-title"]}>{blog.title}</h2>
          <div className={classes["article-excerpt"]}>{blogExcerpt}</div>
          <div className={classes["read-more-link"]}>قراءة المقال</div>
        </div>
      </div>
    </>
  );
};

export default Card;
