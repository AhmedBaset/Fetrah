import fetch from "isomorphic-fetch";
import { API } from "../config";
import queryStrting from "query-string";
import { isAuth, handleResponse } from "./auth";

export const createBlog = (blog, token) => {
  let createBlogEndPoint;

  if (isAuth() && isAuth().role === 1) {
    createBlogEndPoint = `${API}/api/blog`;
  } else if (isAuth() && isAuth().role === 0) {
    createBlogEndPoint = `${API}/api/user/blog`;
  }

  return fetch(createBlogEndPoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listBlogsWithCategoriesAndTags = (skip, limit) => {
  const data = {
    limit,
    skip,
  };
  return fetch(`${API}/api/blogs-categories-tags`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getSingleBlog = (slug = undefined) => {
  return fetch(`${API}/api/blog/${slug}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listRelatedBlogs = (blog) => {
  return fetch(`${API}/api/blogs/related`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const list = (username) => {
  let listBlogsEndPoint;

  if (username) {
    listBlogsEndPoint = `${API}/api/${username}/blogs`;
  } else{
    listBlogsEndPoint = `${API}/api/blogs`;
  }
  return fetch(`${listBlogsEndPoint}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const removeBlog = (slug, token) => {
  let deleteBlogEndPoint;

  if (isAuth() && isAuth().role === 1) {
    deleteBlogEndPoint = `${API}/api/blog/${slug}`;
  } else if (isAuth() && isAuth().role === 0) {
    deleteBlogEndPoint = `${API}/api/user/blog/${slug}`;
  }

  return fetch(`${deleteBlogEndPoint}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateBlog = (blog, token, slug) => {
  let updateBlogEndPoint;

  if (isAuth() && isAuth().role === 1) {
    console.log('Here');
    
    updateBlogEndPoint = `${API}/api/blog/${slug}`;
  } else if (isAuth() && isAuth().role === 0) {
    console.log('THERE');
    updateBlogEndPoint = `${API}/api/user/blog/${slug}`;
  }

  return fetch(`${updateBlogEndPoint}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listSearch = (params) => {
  let query = queryStrting.stringify(params);
  return fetch(`${API}/api/blogs/search?${query}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
