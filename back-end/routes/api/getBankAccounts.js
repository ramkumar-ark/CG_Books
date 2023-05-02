import { getDbController } from "../../db/accountingDb";

const getBankAccounts = async (req, res) => {
    try {
        const orgId = req.params.orgId;
        const dbController = await getDbController(orgId);
        const { '_id': bankGroupId} = await dbController.primaryGroup.getByName('Bank');
        const { '_id': cashGroupId} = await dbController.primaryGroup.getByName('Cash');
        const ledgers = await dbController.ledger.getGroupLedgers([bankGroupId, cashGroupId]);
        const bankDetails = await dbController.bankDetails.getAllAccounts();
        const ledgerAccounts = JSON.parse(JSON.stringify(ledgers));
        for (const ledger of ledgerAccounts) {
            const bankDetailsId = bankDetails.find(e => (e.ledger && e.ledger.toString()) === ledger['_id'].toString());
            if (bankDetailsId) ledger['bankDetailsId'] = bankDetailsId['_id'];
        }
        res.json({accounts: ledgerAccounts}) 
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

export default getBankAccounts;
