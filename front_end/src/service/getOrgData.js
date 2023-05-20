import axios from "axios";
import header from "./createAuthHeader";
import REACT_APP_API_END_POINT from "./apiEndpoint";

const apiBaseEndpoint = `${REACT_APP_API_END_POINT}/api/getorgdata`;

const getOrgData = (orgId) => new Promise((resolve, reject) => {
    axios.get(`${apiBaseEndpoint}/${orgId}`, {headers:header})
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            console.log(err.data);
            reject(err.data);
        });
});

export default getOrgData;