import User from '../models/user';
import jwt from "jsonwebtoken";

const sign = obj => new Promise((resolve, reject) => {
    jwt.sign(obj, process.env.jwtPrivateKey, (error, token) => {
        if (error) return reject(error);
        return resolve(token);
    });
});

const verify = token => new Promise((resolve, reject) => {
    jwt.verify(token, process.env.jwtPrivateKey, error => {
        if (error) return reject();
        return resolve();
    });
});

export const signup = async({name, email, password, mobileNo}) => {
    try {
        const user = await User.create({name, email, password, mobileNo});
        const token = await sign({
            id: user._id,
            name: user.name,
            email: user.email,
        });
        return Promise.resolve({
            user: {id: user._id, name: user.name, lastLoggedIn: user.lastLoggedIn},
            token,
        });
    } catch (error) {
        return Promise.reject({error});
    }
};

export const signin = async({email, password}) => {
    try {
        const user = await User.findOne({email});
        if (!user) return Promise.reject({error: "Incorrect Email-Id"})
        await user.checkPassword(password);
        await user.updateLastLoggedIn();
        const token = await sign({
            id: user._id,
            name: user.name,
            email: user.email,
        });
        return Promise.resolve({
            user: {id: user._id, name: user.name, lastLoggedIn: user.lastLoggedIn},
            token,
        });
    } catch (error) {
        return Promise.reject({error});
    }
};

export const verifyToken = async(token) => {
    try {
        const user = jwt.decode(token);
        const findUser = User.findOne({email: user.email});
        if (!findUser) return Promise.reject({error: "Unauthorized"});
        await verify(token);
        return Promise.resolve();        
    } catch (error) {
        return Promise.reject({error: "Unauthorized"});
    }
};
