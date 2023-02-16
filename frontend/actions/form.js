import fetch from "isomorphic-fetch";
import { API } from "../config";

export const emailContactForm = (data) => {
  let emailEndPoint;

  if (data.authorEmail) {
    emailEndPoint = `${API}/api/contact-blog-author`;
  } else {
    emailEndPoint = `${API}/api/contact`;
  }

  return fetch(emailEndPoint, {
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
