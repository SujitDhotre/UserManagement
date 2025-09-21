import axios from "axios";
import { toast } from "react-toastify";


function GetAllUserService() {
  return axios.get(`http://localhost:8081/api/users/all-users`,{
      headers: {
        "Content-Type": `application/json`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      return false;
    });
}

export default GetAllUserService;