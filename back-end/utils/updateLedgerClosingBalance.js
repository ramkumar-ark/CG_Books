import { getDbController } from "../db/accountingDb";

const updateLedgerClosingBalance = async (orgId, ledgerId) => {
    try {
        const dbController = await getDbController(orgId);
        // get all transactions associated with ledger.
        const transactions = await dbController.transaction.getLedgerTransactions([ledgerId]);
        // get opening balance of the ledger.
        const opBalance = await dbController.ledger.getOpeningBalance(ledgerId);
        // compute closing balance
        const closingBalance = calculateClosingBalance(transactions, ledgerId, opBalance);
        // update closing balance of the ledger
        await dbController.closingBalance.update(ledgerId, closingBalance);
        return Promise.resolve(closingBalance);
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

export function calculateClosingBalance(transactions, ledgerId, openingBalance){
    let closingBalance = openingBalance;
    for (const transac of transactions){
        for (const debit of transac.debits){
            if (debit.ledger.toString() === ledgerId.toString()) closingBalance += debit.amount;
        }
        for (const credit of transac.credits){
            if (credit.ledger.toString() === ledgerId.toString()) closingBalance -= credit.amount;
        }
    }
    return closingBalance;
}

export default updateLedgerClosingBalance;
