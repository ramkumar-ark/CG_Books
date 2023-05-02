import { getDbController } from "../../db/accountingDb";
import { computeNetAmount, extractTransactionIds, transformData } from "../../utils/ledgerTransactionsTransformUtils";

const getGroupTransactions = async (req, res, next) => {
    try {
        const {orgId, groupId} = req.params;
        const dbController = await getDbController(orgId);
        const subGroupIds = await dbController.primaryGroup.getAllSubGroupsOfGroup(groupId);
        const ledgers = await dbController.ledger.getGroupLedgers([groupId, ...subGroupIds]);
        const ledgerIds = ledgers.map(e => e['id']);
        const openingBalance = ledgers.reduce((pv, elem) => pv + elem.opBalance, 0);
        const transactions = await dbController.transaction.getLedgerTransactions(ledgerIds);
        const transactionIds = extractTransactionIds(transactions);
        const voucherNumbers = await dbController.voucherType.getVoucherNumbers(transactionIds);
        const referenceNumbers = await dbController.transaction.getReferenceNumbers(transactionIds);
        const ledgerWiseTransactions = {};
        for (const ledger of ledgers) {
            const ledgerId = ledger.id;
            const ledgerTransactions = transactions.filter(e => {
                for (const entry of [...e.debits, ...e.credits]) {
                    if (entry.ledger.toString() === ledgerId) return true;
                }
            });
            const transactionsModified = computeNetAmount(ledgerTransactions, [ledgerId]);
            const transactionsOfLedger = transformData(transactionsModified, voucherNumbers, referenceNumbers, ledger.opBalance);
            ledgerWiseTransactions[ledgerId] = transactionsOfLedger;
        }
        const transactionsWithNetAmt = computeNetAmount(transactions, ledgerIds);
        const transactionsFinal = transformData(transactionsWithNetAmt, voucherNumbers, referenceNumbers, openingBalance);
        const result = {groupTransactions:transactionsFinal, ledgerWiseTransactions, openingBalance};
        if (req.route && req.route.stack.length > 2) {
            req.transactionsData = result;
            next();
        }else if (req.isMiddleWare){
            return result;
        }else{
            res.json(result);
        }
    } catch (error) {
        res.status(403).json(error);
    }
};

export default getGroupTransactions;
