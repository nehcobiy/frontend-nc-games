import axios from "axios";

const request = axios.create({
  baseURL: "https://nc-games-backend-project.onrender.com/api",
});

export const fetchReviews = () => {
  return request("/reviews").then(({ data: { reviews } }) => {
    return reviews;
  });
};
