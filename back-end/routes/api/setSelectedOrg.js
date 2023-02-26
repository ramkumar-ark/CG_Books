import { setLastSelectedOrg } from "../../controllers/user";

const setSelectedOrg = async (req, res) => {
    try {
        const { userId } = req.params.userId;
        const { orgId } = req.body;
        await setLastSelectedOrg(userId, orgId);
        res.json({message: "Success"});
    } catch (error) {
        res.status(403).json({error});
    }
};

export default setSelectedOrg;
