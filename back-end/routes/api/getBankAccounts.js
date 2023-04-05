import { getDbController } from "../../db/accountingDb";

const getBankAccounts = async (req, res) => {
    try {
        const orgId = req.params.orgId;
        const dbController = await getDbController(orgId);
        const { '_id': bankGroupId} = await dbController.primaryGroup.getByName('Bank');
        const { '_id': cashGroupId} = await dbController.primaryGroup.getByName('Cash');
        const ledgers = await dbController.ledger.getGroupLedgers([bankGroupId, cashGroupId]);
        res.json({accounts: ledgers}) 
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

export default getBankAccounts;
