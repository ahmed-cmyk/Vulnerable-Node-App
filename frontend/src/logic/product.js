import axios from "axios";
import store from "@/store/index";

const productsAPI = "http://localhost:4000/api/products";

export default {
  get: () =>
    axios({
      method: "GET",
      url: productsAPI,
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
