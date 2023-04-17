import { getDbController } from "../../db/accountingDb";

const getEntity = async(req, res) => {
    try {
        const {orgId, entityId} = req.params;
        const dbController = await getDbController(orgId);
        const customer = await dbController.entity.getEntity(entityId);
        res.json({customer});
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
}

export default getEntity;
