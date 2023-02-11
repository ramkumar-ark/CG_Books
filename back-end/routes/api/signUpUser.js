import { signup } from "../../controllers/user";

export default async(req, res) => {
    try {
        const {name, email, password, mobileNo} = req.body;
        const {user, token} = await signup({name, email, password, mobileNo});
        res.json({user, token});
    } catch (error) {
        let errMsg = "";
        switch (error.error.code) {
            case 11000:
                errMsg = "Email Id has already been registered!"
                break;
            default:
                errMsg = "System Error. Contact Support."
                break;
        }
        // Object.keys(error.error).forEach(e => console.log(e + ":::" + error.error[e]));
        res.status(403).json({error: errMsg});
    }
}