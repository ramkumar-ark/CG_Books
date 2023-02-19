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
        const findUser = await User.findOne({email: user.email}).exec();
        if (!findUser) return Promise.reject({error: "Unauthorized"});
        await verify(token);
        return Promise.resolve();        
    } catch (error) {
        return Promise.reject({error: "Unauthorized"});
    }
};

export const setDefaultOrg = async (userId, orgId) => {
    try {
        await User.findByIdAndUpdate(userId, {defaultOrganization: orgId});
        return Promise.resolve();    
    } catch (error) {
        return Promise.reject(error);
    }
};

export const mapOrgToUser = async (orgId, userId, role="admin") => {
    try {
        const {organizations:currentOrgs} = await User.findById(userId, 'organizations').exec();
        if (currentOrgs.length === 0) await setDefaultOrg(userId, orgId);
        currentOrgs.push({orgId, role});
        await User.findByIdAndUpdate(userId, {organizations: currentOrgs});
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getAssociatedOrgs = async (userId) => {
    try {
        const {organizations, defaultOrganization} = await User.findById(userId, 'organizations defaultOrganization').exec();
        return Promise.resolve({organizations, defaultOrganization});
    } catch (error) {
        return Promise.reject(error);
    }
};
