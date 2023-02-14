import React, {useState, createContext} from "react";
import signUpUser from "./service/signUpUser";
import signInUser from "./service/signInUser";
import verifyAuth from "./service/verifySecret";

const AuthCtx = createContext();

const validateSession = async(token) => {
    try {
        await verifyAuth(token);
        return true;    
    } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return false;
    }
};

const initUser = () => {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    if ((token && user) && validateSession(token)) return JSON.parse(user);
    return null;
};

const useAuthentication = () => {
    const [user, setUser] = useState(initUser);
    const [ error, setError ] = useState(null);
    const signup = ({nickname, email, password, phone}) => {
        signUpUser({nickname, email, password, phone})
            .then((user) => {
                setUser(user);
                setError(null);
            })
            .catch((error) => {
                console.log(error);
                setError(error);
                setUser(null);
            });
    }
    const signin = ({email, password}) => {
        signInUser({email, password})
            .then((user) => {
                setUser(user);
                setError(null);
            })
            .catch((error) => {
                console.log(error);
                setError(error);
                setUser(null);
            });
    }

    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setError(null);
    };

    

    return {
        AuthCtx,
        AuthProvider: ({children}) => (
            <AuthCtx.Provider value={{error, user, signup, signin, logOut}}>
                {children}
            </AuthCtx.Provider>
        )
    };
};

export default useAuthentication;