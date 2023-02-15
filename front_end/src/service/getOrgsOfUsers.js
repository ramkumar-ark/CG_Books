import axios from "axios"
import header from "./createAuthHeader";

const apiBaseEndpoint = "http://localhost:3001/api/getassociatedorgs";

export default function getOrgsOfUsers(userId){
    return new Promise((resolve, reject) => {
        axios.get(`${apiBaseEndpoint}/${userId}`, {headers:header})
            .then(res => {
                resolve(res.data);
            })
            .catch(reason => {
                console.log(reason);
                reject(reason);
            });
    });
} 