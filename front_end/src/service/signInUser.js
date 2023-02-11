import axios from "axios";

const apiBaseEndpoint = "http://localhost:3001/api/signin";

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