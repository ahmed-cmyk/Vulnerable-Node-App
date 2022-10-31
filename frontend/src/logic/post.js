import axios from "axios";
import store from "@/store/index";

const postsAPI = "http://localhost:4000/api/posts";

export default {
  get: () =>
    axios({
      method: "GET",
      url: postsAPI,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.data);
      }),
  create: (data, token) =>
    axios({
      method: "POST",
      url: postsAPI,
      data: data,
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.data);
        store.dispatch("setErrorMessage", error.response.data["error"]);
      }),
  update: (id, data, token) =>
    axios({
      method: "PATCH",
      url: postsAPI + `/${id}`,
      data: data,
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.data);
        store.dispatch("setErrorMessage", error.response.data["error"]);
      }),
  delete: (id, token) =>
    axios({
      method: "DELETE",
      url: postsAPI + `/${id}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.data);
        store.dispatch("setErrorMessage", error.response.data["error"]);
      }),
};
