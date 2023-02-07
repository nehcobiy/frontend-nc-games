import axios from "axios";

const request = axios.create({
  baseURL: "https://nc-games-backend-project.onrender.com/api",
});

export const fetchReviews = () => {
  return request("/reviews").then(({ data: { reviews } }) => {
    return reviews;
  });
};

export const fetchReviewById = (id) => {
  return request(`/reviews/${id}`).then(({ data: { review } }) => {
    return review;
  });
};

export const fetchCommentsByReviewId = (id) => {
  return request(`/reviews/${id}/comments`).then(({ data }) => {
    return data;
  });
};

export const fetchUsers = () => {
  return request("/users").then(({ data }) => {
    return data;
  });
};

export const fetchUsersAvatar = () => {
  return request("/users").then(({ data: { avatar_url } }) => {
    return avatar_url;
  });
};
