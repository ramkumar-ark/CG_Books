import { getDbController } from "../../db/accountingDb";

const getCustomers = async(req, res) => {
    try {
        const orgId = req.params.orgId;
        const dbController = await getDbController(orgId);
        const customers = await dbController.entity.fetchCustomers();
        res.json({customers});
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
}

export default getCustomers;
