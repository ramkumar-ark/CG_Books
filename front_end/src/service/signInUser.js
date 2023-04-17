import axios from "axios";
import REACT_APP_API_END_POINT from "./apiEndpoint";

const apiBaseEndpoint = `${REACT_APP_API_END_POINT}/api/signin`;

const signInUser = ({email, password}) => 
    new Promise((resolve, reject) => {
        const reqObj = {email, password};
        axios.post(apiBaseEndpoint, reqObj)
            .then(res => {
                const {user, token} = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                resolve(user);
            })
            .catch(error => reject(error.response.data.error));
    });

export default signInUser;