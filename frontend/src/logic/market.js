import axios from "axios";
import store from "@/store/index";

const marketAPI = "http://localhost:4000/api/market";

export default {
  create: (data) =>
    axios({
      method: "POST",
      url: marketAPI,
      data: data,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    })
      .then((res) => res)
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.data);
        store.dispatch("setErrorMessage", error.response.data["error"]);
      }),
};
