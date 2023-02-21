import axios from "axios";
import header from "./createAuthHeader";

const apiBaseEndpoint = "http://localhost:3001/api/openorg";

const openOrg = (orgId) => new Promise((resolve, reject) => {
    axios.get(`${apiBaseEndpoint}/${orgId}`, {headers:header})
        .then(res => resolve(res.data))
        .catch(err => reject(err.data));
});

export default openOrg;
