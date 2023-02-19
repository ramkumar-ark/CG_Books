import axios from "axios";
import header from "./createAuthHeader";

const apiBaseEndpoint = "http://localhost:3001/api/getorgdata";

const getOrgData = (orgId) => new Promise((resolve, reject) => {
    axios.get(`${apiBaseEndpoint}/${orgId}`, {headers:header})
        .then(res => {
            console.log(res);
            resolve(res.data);
        })
        .catch(err => {
            console.log(err.data);
            reject(err.data);
        });
});

export default getOrgData;