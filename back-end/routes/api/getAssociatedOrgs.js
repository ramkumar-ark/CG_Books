import { getAssociatedOrgs } from "../../controllers/user";

export default async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await getAssociatedOrgs(userId);
        res.json(result);
    } catch (error) {
        res.status(403).json({error});
    }
};