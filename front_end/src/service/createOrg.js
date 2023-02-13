import axios from "axios";

const apiBaseEndpoint = "http://localhost:3001/api/createorg";

const createOrg = (orgDetails) => new Promise((resolve, reject) => {
    axios.post(apiBaseEndpoint, orgDetails)
        .then(res => {
            console.log(res.data);
            resolve(res.data.orgId);
        })
        .catch(err => reject(err));
});

export default createOrg;