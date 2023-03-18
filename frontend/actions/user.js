import fetch from "isomorphic-fetch";
import { API } from "../config";

export const checkInFavourites = (sender, userToCheck, token) => {
  const data = {
    sender,
    userToCheck,
  };
  return fetch(`${API}/api/user/in-favourite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const sendAcceptanceRequest = (sender, reciever, token) => {
  const data = {
    sender,
    reciever,
  };
  return fetch(`${API}/api/user/acceptance-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const addToFavourite = (sender, userToAdd, token) => {
  const data = {
    sender,
    userToAdd,
  };
  return fetch(`${API}/api/user/add-favourite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const removeFromFavourite = (sender, userToRemove, token) => {
  const data = {
    sender,
    userToRemove,
  };
  return fetch(`${API}/api/user/remove-favourite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getUsers = (skip, limit) => {
  const data = {
    limit,
    skip,
  };
  return fetch(`${API}/api/users`, {
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

export const getQuestions = () => {
  return fetch(`${API}/api/user-questions`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const confirmUser = (username, token) => {
  return fetch(`${API}/api/confirm`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const rejectUser = (username, token) => {
  return fetch(`${API}/api/reject`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getUsersThatNeedConfirmations = (token) => {
  return fetch(`${API}/api/users/need-confirmation`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const userPublicProfile = (username) => {
  return fetch(`${API}/api/user/${username}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getProfile = (token) => {
  return fetch(`${API}/api/user/profile`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const update = (token, user) => {
  return fetch(`${API}/api/user/update`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: user,
  })
    .then((response) => {
      // handleResponse(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
