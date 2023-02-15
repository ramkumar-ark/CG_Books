import axios from "axios";
import header from "./createAuthHeader";

const apiBaseEndpoint = "http://localhost:3001/api/createorg";

const createOrg = (orgDetails) => new Promise((resolve, reject) => {
    axios.post(apiBaseEndpoint, orgDetails, {headers:header})
        .then(res => {
            console.log(res.data);
            resolve(res.data.orgId);
        })
        .catch(err => reject(err));
});

export default createOrg;