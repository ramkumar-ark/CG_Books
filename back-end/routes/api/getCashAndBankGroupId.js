import { getDbController } from "../../db/accountingDb";

const getCashAndBankGroupId = async (req, res, next) => {
    try {
        const {orgId} = req.params;
        const dbController = await getDbController(orgId);
        const { '_id': bankGroupId} = await dbController.primaryGroup.getByName('Bank');
        const { '_id': cashGroupId} = await dbController.primaryGroup.getByName('Cash');
        req.result = [cashGroupId, bankGroupId];
        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

export default getCashAndBankGroupId;
