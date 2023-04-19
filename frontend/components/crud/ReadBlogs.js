import moment from "moment/moment";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";

const ReadBlogs = ({ username }) => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const token = getCookie("token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await isAuth();
      setUser(result);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    list(username).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  const deleteBlog = (slug) => {
    removeBlog(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
        loadBlogs();
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Are you sure you want to delete this blog");
    if (answer) {
      deleteBlog(slug);
    }
  };

  const showUpdateButton = (blog) => {
    let path = "";
    path = `/admin/crud/${blog.slug}`;
    // if (user && user.role === 0) {
    //   //path for normal user
    //   path = `/user/crud/${blog.slug}`;
    // } else if (user && user.role === 1) {
    //   //path for admin user
    //   path = `/admin/crud/${blog.slug}`;
    // }
    return (
      <Link
        className="me-2 btn btn-sm btn-warning"
        style={{ textDecoration: "none" }}
        href={`${path}`}
      >
        تعديل
      </Link>
    );
  };

  const showLoadedBlogs = () => {
    return blogs.map((blog, i) => {
      // const info = `Written by ${blog.postedBy.name} | Published on ${" "}
      //   ${moment(blog.updatedAt).fromNow()}`;
      return (
        <div key={i} className="pb-5">
          <h3>{blog.title}</h3>
          {/* <p className="mark">{info}</p> */}
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteConfirm(blog.slug)}
          >
            حذف
          </button>
          {showUpdateButton(blog)}
        </div>
      );
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {message && <div className="alert alert-warning">{message}</div>}
            {showLoadedBlogs()}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadBlogs;
