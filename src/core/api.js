import axios from "axios";

const auth = {
  username: "bigvu",
  password: "interview",
};

export const createApiClient = () => {
  return {
    getCourseList: () => {
      return axios
        .get(`course/list`, {
          auth,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err));
    },
    getCourse: (id) => {
      return axios
        .get(`course/${id}`, {
          auth,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err));
    },
  };
};
