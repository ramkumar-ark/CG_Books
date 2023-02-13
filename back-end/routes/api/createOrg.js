import { addOrganization } from "../../controllers/organization";

export default async (req, res) => {
    try {
        const reqBody = req.body;
        const {orgId} = await addOrganization(reqBody);
        res.json({orgId})
    } catch (error) {
        console.log(error);
        res.status(403).json(error);
    }
};