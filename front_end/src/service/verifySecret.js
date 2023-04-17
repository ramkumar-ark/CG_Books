import axios from "axios";
import REACT_APP_API_END_POINT from "./apiEndpoint";

const apiBaseEndpoint = `${REACT_APP_API_END_POINT}/api/verify/secret`;

const verifyAuth = (token) => 
    new Promise((resolve, reject) => {
        axios.post(apiBaseEndpoint, {token})
            .then(res => {
                res.data.status ? resolve() : reject();
            })
            .catch(error => {
                reject(error.response?.data?.error);
            });
    });

export default verifyAuth;