import { getDbController } from "../../db/accountingDb";

const deleteLedgers = async (req, res, next) => {
    try {
        const {orgId} = req.params;
        const {ledgerIds} = req.body;
        const dbController = await getDbController(orgId);
        const [nonEmptyLedgerIds, emptyLedgerIds] = [[], []];
        for (const ledgerId of ledgerIds) {
            const isLedgerUsed = await dbController.transaction.isTransactionPresentForLedger(ledgerId);
            isLedgerUsed ? nonEmptyLedgerIds.push(ledgerId) : emptyLedgerIds.push(ledgerId);
        }
        await dbController.ledger.deleteLedgers(emptyLedgerIds);
        req.result = nonEmptyLedgerIds;
        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({message:error.message});
    }
};

export default deleteLedgers;
