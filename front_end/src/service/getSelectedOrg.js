import axios from "axios";
import header from "./createAuthHeader";

const apiBaseEndpoint = "http://localhost:3001/api/getselectedorg";

const getSelectedOrg = (userId) => new Promise((resolve, reject) => {
    axios.get(`${apiBaseEndpoint}/${userId}`, {headers:header})
        .then(res => {
            console.log(res.data);
            resolve(res.data.selectedOrg);
        })
        .catch(err => reject(err));
});

export default getSelectedOrg;
