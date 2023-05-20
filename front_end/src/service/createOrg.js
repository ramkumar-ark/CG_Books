import axios from "axios";
import header from "./createAuthHeader";
import REACT_APP_API_END_POINT from "./apiEndpoint";

const apiBaseEndpoint = `${REACT_APP_API_END_POINT}/api/createorg`;

const createOrg = (orgDetails) => new Promise((resolve, reject) => {
    axios.post(apiBaseEndpoint, orgDetails, {headers:header})
        .then(res => {
            resolve(res.data.orgId);
        })
        .catch(err => {reject(err)});
});

export default createOrg;