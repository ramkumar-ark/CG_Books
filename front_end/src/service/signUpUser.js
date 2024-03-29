import axios from "axios";
import REACT_APP_API_END_POINT from "./apiEndpoint";

const apiBaseEndpoint = `${REACT_APP_API_END_POINT}/api/signup`;

const signUpUser = ({nickname, email, password, phone}) => 
    new Promise((resolve, reject) => {
        const reqObj = {name: nickname, email, password, mobileNo: phone};
        axios.post(apiBaseEndpoint, reqObj)
            .then(res => {
                const {user, token} = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                resolve(user);
            })
            .catch(error => reject(error.response.data.error));
    });

export default signUpUser;
