
const otherDetailsDocumentData = (data) => {
    const {customer:linkedEntity, notes, amount:totalAmount, amountOffset, mode:receiptMode} = data;
    const billingAddress = data.selectedCustomer.addresses.find(e => e.type === 'billing');
    const partyName = data.selectedCustomer.name;
    const otherDetails = {
        linkedEntity, partyName, billingAddress, notes, totalAmount,  offSetTransactions:amountOffset,
        receiptMode, 
    };
    return otherDetails;
};

const transactionDocumentData = (data) => {
    const {date: transactionDate, notes:narration, referenceNumber, bankLedger, 
        amount, bankCharges, bankChargesLedgerId, selectedCustomer, userId} = data;
    const debits = [];
    debits.push({ledger:bankLedger, amount:amount-(bankCharges || 0)});
    bankCharges && debits.push({ledger:bankChargesLedgerId, amount:bankCharges});
    const credits = [];
    credits.push({ledger:selectedCustomer.ledger['_id'], amount:amount});
    return {transactionDate, debits, credits, status: "active", userId, narration, referenceNumber};
};

const transformData = (data) => {
    const otherDetails = otherDetailsDocumentData(data);
    const transaction = transactionDocumentData(data);
    return {otherDetails, transaction, voucherType:"Receipt", voucherNumber: data.voucherNumber};
};

export default transformData;
