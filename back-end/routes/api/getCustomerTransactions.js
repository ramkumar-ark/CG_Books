import { getDbController } from '../../db/accountingDb';

const computeNetAmount = (transactions, customerLedgerId) => {
    for (const transac of transactions){
        let netAmount = 0;
        for (const debit of transac.debits){
            if (debit.ledger.toString() === customerLedgerId) netAmount += debit.amount;
        }
        for (const credit of transac.credits){
            if (credit.ledger.toString() === customerLedgerId) netAmount -= credit.amount;
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

const transformData = (data, voucherNumbers, opBalance) => {
    const transactions = [];
    let runningBalance = opBalance;
    for (const transac of data){
        runningBalance += transac.netAmount;
        const transaction = {
            date: transac.transactionDate, voucherType:transac.voucherType.primaryType, 
            voucherNumber: voucherNumbers[transac['_id']], dueDate: transac.otherDetails.dueDate,
            amount:transac.netAmount, referenceNumber: transac.referenceNumber, runningBalance,
            status:transac.otherDetails.status, pendingAmount:transac.otherDetails.pendingAmount,
        }
        transactions.push(transaction);
    }
    return transactions;
};


const getCustomerTransactions = async (req, res) => {
    try {
        const { orgId, customerLedgerId } = req.params;
        const dbController = await getDbController(orgId);
        let transactions = await dbController.transaction.getCustomerTransactions(customerLedgerId);
        transactions = computeNetAmount(transactions, customerLedgerId);
        const transactionIds = extractTransactionIds(transactions);
        const voucherNumbers = await dbController.voucherType.getVoucherNumbers(transactionIds);
        const opBalance = await dbController.ledger.getOpeningBalance(customerLedgerId);
        transactions = transformData(transactions, voucherNumbers, opBalance);
        res.json({transactions});
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

export default getCustomerTransactions;
