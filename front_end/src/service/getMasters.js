import axios from "axios";
import header from "./createAuthHeader";

const apiBaseEndpoint = "http://localhost:3001/api/getmasters";

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