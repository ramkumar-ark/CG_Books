import axios from "axios";
import header from "./createAuthHeader";
import REACT_APP_API_END_POINT from "./apiEndpoint";

const apiBaseEndpoint = `${REACT_APP_API_END_POINT}/api/getselectedorg`;

const getSelectedOrg = (userId) => new Promise((resolve, reject) => {
    axios.get(`${apiBaseEndpoint}/${userId}`, {headers:header})
        .then(res => {
            resolve(res.data.selectedOrg);
        })
        .catch(err => reject(err));
});

export default getSelectedOrg;
