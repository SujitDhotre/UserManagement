// src/Services/UserLoginService.js
import axios from "axios";
import { toast } from "react-toastify";

function UserLoginService(data) {
  return axios
    .post("http://localhost:8081/api/users/log-in", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      toast.success(res.data.message);
      return res.data;
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
      return false;
    });
}

export default UserLoginService;
