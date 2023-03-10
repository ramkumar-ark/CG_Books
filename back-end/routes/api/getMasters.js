import { getDbController } from "../../db/accountingDb";

export default async function getMasters(req, res){
    try {
        const orgId = req.params.orgId;
        const dbController = await getDbController(orgId);
        const result = await dbController.utils.getAllMasters();
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};