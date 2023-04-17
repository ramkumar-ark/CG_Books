import axios from "axios";
import header from "./createAuthHeader";

const apiBaseEndpoint = `${process.env.REACT_APP_API_END_POINT}/api/getselectedorg`;

const getSelectedOrg = (userId) => new Promise((resolve, reject) => {
    axios.get(`${apiBaseEndpoint}/${userId}`, {headers:header})
        .then(res => {
            console.log(res.data);
            resolve(res.data.selectedOrg);
        })
        .catch(err => reject(err));
});

export default getSelectedOrg;
