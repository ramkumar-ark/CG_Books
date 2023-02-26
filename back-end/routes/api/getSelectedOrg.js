import { getOrgById } from "../../controllers/organization";
import { getLastSelectedOrg } from "../../controllers/user";

const getSelectedOrg = async (req, res) => {
    try {
        const userId = req.params.userId;
        const selectedOrgId = await getLastSelectedOrg(userId);
        const selectedOrg = await getOrgById(selectedOrgId);
        res.json({selectedOrg});
    } catch (error) {
        res.status(403).json({error});
    }
};

export default getSelectedOrg;
