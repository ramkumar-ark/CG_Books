export const computeNetAmount = (transactions, ledgerIds) => {
    for (const transac of transactions){
        let netAmount = 0;
        for (const debit of transac.debits){
            if (ledgerIds.includes(debit.ledger.toString())) netAmount += debit.amount;
        }
        for (const credit of transac.credits){
            if (ledgerIds.includes(credit.ledger.toString())) netAmount -= credit.amount;
        }
        transac.netAmount = netAmount;
    }
    return transactions;
};

export const extractTransactionIds = (transactions) => {
    const transactionIds = [];
    for (const transac of transactions){
        transactionIds.push(transac['_id'].toString());
    }
    return transactionIds;
};

export const transformData = (data, voucherNumbers, referenceNumbers, opBalance) => {
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
            pendingAmount:transac.otherDetails.pendingAmount, offsetAmounts, id:[transac['_id']]
        };
        transactions.push(transaction);
    }
    return transactions;
};