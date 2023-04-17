import axios from "axios";
import header from "./createAuthHeader";

const apiBaseEndpoint = `${process.env.REACT_APP_API_END_POINT}/api/getmasters`;

const getMasters = (orgId) => new Promise((resolve, reject) => {
    axios.get(`${apiBaseEndpoint}/${orgId}`, {headers:header})
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            console.log(err.data);
            reject(err.data);
        });
});

export default getMasters;