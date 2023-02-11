import { signin } from "../../controllers/user";

export default async(req, res) => {
    try {
        const {email, password} = req.body;
        const {user, token} = await signin({email, password});
        res.json({user, token});
    } catch (error) {
        // Object.keys(error.error).forEach(e => console.log(e + ":::" + error.error[e]));
        console.log(error);
        res.status(403).json(error);
    }
};