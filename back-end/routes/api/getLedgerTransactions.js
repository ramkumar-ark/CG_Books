import { getDbController } from '../../db/accountingDb';
import { computeNetAmount, extractTransactionIds, transformData } from '../../utils/ledgerTransactionsTransformUtils';

const getLedgerTransactions = async (req, res) => {
    try {
        const { orgId, ledgerId } = req.params;
        const dbController = await getDbController(orgId);
        let transactions = await dbController.transaction.getLedgerTransactions([ledgerId]);
        transactions = computeNetAmount(transactions, [ledgerId]);
        const transactionIds = extractTransactionIds(transactions);
        const voucherNumbers = await dbController.voucherType.getVoucherNumbers(transactionIds);
        const referenceNumbers = await dbController.transaction.getReferenceNumbers(transactionIds);
        const opBalance = await dbController.ledger.getOpeningBalance(ledgerId);
        transactions = transformData(transactions, voucherNumbers, referenceNumbers, opBalance);
        res.json({transactions});
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

export default getLedgerTransactions;
