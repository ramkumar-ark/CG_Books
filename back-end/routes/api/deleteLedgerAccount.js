import { getDbController } from "../../db/accountingDb";

const deleteLedgerAccount = async (req, res, next) => {
    try {
        const {orgId, ledgerId} = req.params;
        const dbController = await getDbController(orgId);
        const isLedgerUsed = await dbController.transaction.isTransactionPresentForLedger(ledgerId);
        if (isLedgerUsed) res.status(403).json({message:'LedgerNotEmpty'});
        else {
            await dbController.ledger.delete(ledgerId);
            req.result = {message:'success'};
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(403).json({message: error.message});
    }
};

export default deleteLedgerAccount;
