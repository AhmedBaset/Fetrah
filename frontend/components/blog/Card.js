import moment from "moment/moment";
import { API } from "../../config";
import Link from "next/link";
// import Image from "next/image";

const Card = ({ blog, parser }) => {
  const blogExcerpt = parser.parse(blog.excerpt);

  const showBlogCategories = (blog) => {
    return blog.categories.map((category, i)=>{
        return (
            <Link key={i} href={`/categories/${category.slug}`}>
                <p className="btn btn-primary mr-1 ms-1 mt-1">{category.name}</p>
            </Link>
        )
    })
  };

  

  const showBlogTags= (tag) => {
    return blog.tags.map((tag, i)=>{
        return (
            <Link key={i} href={`/tags/${tag.slug}`}>
                <p className="btn btn-outline-primary mr-1 ms-1 mt-1">{tag.name}</p>
            </Link>
        )
    })
  };
  
  return (
    <div className="lead pb-4">
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <h2 className="pt-3 pb-3 fw-bold">{blog.title}</h2>
        </Link>
      </header>
      <section>
        <p className="mark ms-1 pt-2 pb-2">
          Written by {blog.postedBy.name} | Published{" "}
          {moment(blog.updatedAt).fromNow()}
        </p>
      </section>
      <section>
        {showBlogCategories(blog)}
        {showBlogTags(blog)}
        <br/>
        <br/>
      </section>

      <div className="row">
        <div className="col-md-4">
            <section>
                <img className="img img-fluid" height="400" width="300" style={{maxHeight: '150px', width: 'auto'}} alt="" src={`${API}/api/blog/photo/${blog.slug}`} />
            </section>
        </div>
        <div className="col-md-8">
          <section>
            <div className="pb-3">{blogExcerpt}</div>

            <Link href={`/blogs/${blog.slug}`}>
              <p className="btn btn-primary mt-2">Read More...</p>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Card;
