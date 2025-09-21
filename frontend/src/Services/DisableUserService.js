import axios from "axios";
import { toast } from "react-toastify";
function DisableUserService(data) 
{ 
    return axios.post(`http://localhost:8081/api/users/disable`,data, {
        headers: {
            "Content-Type": `application/json`,
        }
    })
    .then((res) => {
        toast.success(res.data.message)
        return res.data;
    })
    .catch((error) => {
        toast.error(error.response.data.message)
        return false;
    });
}

export default DisableUserService;