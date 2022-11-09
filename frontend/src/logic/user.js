import axios from "axios";
import store from "@/store/index";

const loginAPI = "http://localhost:4000/api/login";
const userAPI = "http://localhost:4000/api/user";

export default {
  login: (creds) =>
    axios({
      method: "POST",
      url: loginAPI,
      data: creds,
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
        store.dispatch("setErrorMessage", error.response.data["error"]);
      }),
  register: (creds) =>
    axios({
      method: "POST",
      url: userAPI,
      data: creds,
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
        store.dispatch("setErrorMessage", error.response.data["error"]);
      }),
};
