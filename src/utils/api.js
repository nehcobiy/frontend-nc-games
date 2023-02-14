import axios from "axios";

const request = axios.create({
  baseURL: "https://nc-games-backend-project.onrender.com/api",
});

export const fetchReviews = (sortBy, order) => {
  return request("/reviews", {
    params: {
      sort_by: sortBy,
      order: order,
    },
  }).then(({ data: { reviews } }) => {
    return reviews;
  });
};

export const fetchReviewById = (id) => {
  return request(`/reviews/${id}`).then(({ data: { review } }) => {
    return review;
  });
};

export const fetchCommentsByReviewId = (id) => {
  return request(`/reviews/${id}/comments`).then(({ data: { comments } }) => {
    return comments;
  });
};

export const fetchUsers = () => {
  return request("/users").then(({ data: { users } }) => {
    return users;
  });
};

export const patchReviewVotes = (id, vote) => {
  const patchBody = { inc_votes: vote };
  return request.patch(`/reviews/${id}`, patchBody).then(({ data }) => {
    console.log(data);
  });
};

export const postComment = (id, newComment) => {
  const postBody = {
    username: "tickle122",
    body: newComment,
  };
  return request.post(`/reviews/${id}/comments`, postBody).then(({ data }) => {
    return data;
  });
};

export const fetchCategories = () => {
  return request.get("/categories").then(({ data }) => {
    const categories = [];
    data.forEach((element) => {
      categories.push(element.slug);
    });
    return categories;
  });
};

export const fetchReviewsByCategory = (category) => {
  return request
    .get(`/reviews?category=${category}`)
    .then(({ data: { reviews } }) => {
      return reviews;
    });
};

export const deleteCommentByCommentId = (id) => {
  const deleteBody = {
    comment_id: id,
  };
  return request.delete(`/comments/${id}`, deleteBody);
};
