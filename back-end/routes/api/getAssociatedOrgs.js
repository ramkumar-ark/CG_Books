import { getAssociatedOrgs } from "../../controllers/user";

export default async (req, res) => {
    try {
        const userId = req.params.userId;
        const organizations = await getAssociatedOrgs(userId);
        res.json({organizations});
    } catch (error) {
        res.status(403).json({error});
    }
};