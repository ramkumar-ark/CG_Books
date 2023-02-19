import { getOrgById } from "../../controllers/organization";

const getOrgData = async (req, res) => {
    try {
        const orgId = req.params.orgId;
        const result = await getOrgById(orgId);
        res.json(result);
    } catch (error) {
        console.log(error.data);
        res.status(403).json({error});
    }
};

export default getOrgData;
