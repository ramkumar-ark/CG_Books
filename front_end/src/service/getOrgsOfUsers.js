import axios from "axios"

const apiBaseEndpoint = "http://localhost:3001/api/getassociatedorgs";

export default function(userId){
    return new Promise((resolve, reject) => {
        axios.get(`${apiBaseEndpoint}/${userId}`)
            .then(res => {
                console.log(res.data)
                resolve(res.data);
            })
            .catch(reason => {
                console.log(reason);
                reject(reason);
            });
    });
} 