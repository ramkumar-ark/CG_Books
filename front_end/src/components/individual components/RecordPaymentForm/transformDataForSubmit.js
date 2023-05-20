
const otherDetailsDocumentData = (data) => {
    const {notes, amount:totalAmount, amountOffset, mode:receiptMode} = data;
    const offSetTransactions = amountOffset.filter(e => !!e.amount);
    const linkedEntity = data.customer || data.vendor;
    const billingAddress = data.selectedEntity.addresses.find(e => e.type === 'billing');
    const partyName = data.selectedEntity.name;
    const otherDetails = {
        linkedEntity, partyName, billingAddress, notes, totalAmount,  offSetTransactions, receiptMode, 
    };
    return otherDetails;
};

const transactionDocumentData = (data) => {
    const {date: transactionDate, notes:narration, referenceNumber, bankLedger, 
        amount, bankCharges, bankChargesLedgerId, selectedEntity, userId} = data;
    const entries1 = [];
    entries1.push({ledger:bankLedger, amount:amount-(bankCharges || 0)});
    bankCharges > 0 && entries1.push({ledger:bankChargesLedgerId, amount:bankCharges});
    const entries2 = [];
    entries2.push({ledger:selectedEntity.ledger['_id'], amount:amount});
    let debits, credits;
    if (data.voucherType === 'Receipt') {
        debits = entries1;
        credits = entries2;
    }else {
        debits = entries2;
        credits = entries1;
    }
    return {transactionDate, debits, credits, status: "active", userId, narration, referenceNumber};
};

const transformData = (data) => {
    const otherDetails = otherDetailsDocumentData(data);
    const transaction = transactionDocumentData(data);
    return {otherDetails, transaction, voucherType:data.voucherType, voucherNumber: data.voucherNumber};
};

export default transformData;
