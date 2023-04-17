import { getDbController } from '../../db/accountingDb';

const computeNetAmount = (transactions, ledgerId) => {
    for (const transac of transactions){
        let netAmount = 0;
        for (const debit of transac.debits){
            if (debit.ledger.toString() === ledgerId) netAmount += debit.amount;
        }
        for (const credit of transac.credits){
            if (credit.ledger.toString() === ledgerId) netAmount -= credit.amount;
        }
        transac.netAmount = netAmount;
    }
    return transactions;
};

const extractTransactionIds = (transactions) => {
    const transactionIds = [];
    for (const transac of transactions){
        transactionIds.push(transac['_id'].toString());
    }
    return transactionIds;
};

const transformData = (data, voucherNumbers, referenceNumbers, opBalance) => {
    const transactions = [];
    let runningBalance = opBalance;
    for (const transac of data){
        runningBalance += transac.netAmount;
        const voucherNumber = voucherNumbers[transac['_id']];
        const offsetAmounts = transac.otherDetails.offSetTransactions.map(e => (
            {amount:e.amount, transaction: e.transaction || 'openingBalance', 
                voucherNumber: e.transaction ? voucherNumbers[e.transaction] : 'Opening Balance',
                referenceNumber: e.transaction ? referenceNumbers[e.transaction] : 'Opening Balance'
            }));
        const transaction = {
            date: transac.transactionDate, voucherType:transac.voucherType.primaryType, 
            voucherNumber, dueDate: transac.otherDetails.dueDate, amount:transac.netAmount, 
            referenceNumber: transac.referenceNumber, runningBalance, status:transac.otherDetails.status,
            pendingAmount:transac.otherDetails.pendingAmount, offsetAmounts,
        }
        transactions.push(transaction);
    }
    return transactions;
};


const getLedgerTransactions = async (req, res) => {
    try {
        const { orgId, ledgerId } = req.params;
        const dbController = await getDbController(orgId);
        let transactions = await dbController.transaction.getLedgerTransactions(ledgerId);
        transactions = computeNetAmount(transactions, ledgerId);
        const transactionIds = extractTransactionIds(transactions);
        const voucherNumbers = await dbController.voucherType.getVoucherNumbers(transactionIds);
        const referenceNumbers = await dbController.transaction.getReferenceNumbers(transactionIds);
        const opBalance = await dbController.ledger.getOpeningBalance(ledgerId);
        transactions = transformData(transactions, voucherNumbers, referenceNumbers, opBalance);
        await dbController.closingBalance.update(ledgerId, transactions.length > 0 ? transactions.at(-1).runningBalance : opBalance);
        res.json({transactions});
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

export default getLedgerTransactions;
