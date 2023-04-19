import Link from "next/link";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";
import { Button, ButtonGroup } from "reactstrap";
const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <h5>Loading ...</h5>,
});
//required for quill css
import "../../node_modules/react-quill/dist/quill.snow.css";
import {QuillFormats, QuillModules} from '../../helpers/quill';

const BlogCreate = ({ router }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const onCategoryChecked = (selected) => {
    const index = selectedCategories.indexOf(selected);
    if (index < 0) {
      selectedCategories.push(selected);
    } else {
      selectedCategories.splice(index, 1);
    }
    setSelectedCategories([...selectedCategories]);
    formData.set(
      "categories",
      selectedCategories.map((x) => categories[x]._id)
    );
  };

  const [selectedTags, setSelectedTags] = useState([]);
  const onTagChecked = (selected) => {
    const index = selectedTags.indexOf(selected);
    if (index < 0) {
      selectedTags.push(selected);
    } else {
      selectedTags.splice(index, 1);
    }
    setSelectedTags([...selectedTags]);
    formData.set(
      "tags",
      selectedTags.map((x) => tags[x]._id)
    );
  };

  const token = getCookie("token");
  const blogFromLocalStorage = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [body, setBody] = useState(blogFromLocalStorage());
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    hidePublishButton: false,
  });

  const { error, sizeError, success, formData, title, hidePublishButton } =
    values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const publishBlog = (e) => {
    e.preventDefault();
    console.log();
    
    createBlog(formData, token).then((response) => {
      if (response.error) {
        setValues({ ...values, error: response.error });
        console.log(response.error);
      } else {
        setValues({
          ...values,
          title: "",
          error: "",
          success: `A new blog titled ${response.title} is created`,
        });
        setBody("");
        setSelectedCategories([]);
        setSelectedTags([]);
      }
    });
  };

  const handleOnChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;

    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set("body", e);
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const showCategories = () => {
    return categories.map((item, index) => {
      return (
        <li key={index} className="list-unstyled m-2">
          <ButtonGroup>
            <Button
              color="primary"
              outline
              onClick={() => onCategoryChecked(index)}
              active={selectedCategories.includes(index)}
            >
              {item.name}
            </Button>
          </ButtonGroup>
        </li>
      );
    });
  };

  const showTags = () => {
    return tags.map((item, index) => {
      return (
        <li key={index} className="list-unstyled m-2">
          <ButtonGroup>
            <Button
              color="primary"
              outline
              onClick={() => onTagChecked(index)}
              active={selectedTags.includes(index)}
            >
              {item.name}
            </Button>
          </ButtonGroup>
        </li>
      );
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      {success}
    </div>
  );

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group m-2">
          <label htmlFor="blogTitle">Title</label>
          <input
            type="text"
            className="form-control"
            id="blogTitle"
            placeholder="Title"
            value={title}
            onChange={handleOnChange("title")}
          />
        </div>
        <div className="form-group m-2">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            theme="snow"
            placeholder={""}
            onChange={handleBody}
          />
        </div>
        <div>
          <button className="btn btn-primary m-2" type="submit">
            نشر المقالة
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-8">
          {createBlogForm()}
          {showError()}
          {showSuccess()}
        </div>
        <div className="col-4">
          <div>
            <div className="form-group pb-2 mb-3">
              <h5>Featured Image</h5>
              <br />
              <small className="text-muted d-block">Max size 1mb</small>
              <label className="btn btn-outline-info">
                Upload featured image
                <input
                  onChange={handleOnChange("photo")}
                  type="file"
                  accept="image/*"
                  className="form-control"
                  hidden
                />
              </label>
            </div>
          </div>
          <div>
            <h5>Categories</h5>
            <ul style={{ maxHeight: "130px", overflowY: "scroll" }}>
              {showCategories()}
            </ul>
            <br />
          </div>
          <div>
            <h5>Tags</h5>
            <ul style={{ maxHeight: "130px", overflowY: "scroll" }}>
              {showTags()}
            </ul>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};



export default withRouter(BlogCreate);
