import axios from "axios";

const apiBaseEndpoint = "http://localhost:3001/api/verify/secret";

const verifyAuth = (token) => 
    new Promise((resolve, reject) => {
        axios.post(apiBaseEndpoint, {token})
            .then(res => res.data.status ? resolve() : reject())
            .catch(error => {
                reject(error.response?.data?.error);
            });
    });

export default verifyAuth;