
function transformData(formData) {
    const {date, entries, notes, referenceNumber, voucherNumber} = formData;
    const totalAmount = entries.reduce((pv, e) => pv + (e.debit || 0), 0);
    const otherDetails = {
        notes, totalAmount:Number(totalAmount), status:'unPaid', 
    };
    const debits = entries.filter(e => e.debit).map(e => ({ledger:e.ledger, amount:e.debit}));
    const credits = entries.filter(e => e.credit).map(e => ({ledger:e.ledger, amount:e.credit}));
    const transaction = {
        transactionDate:date, debits, credits, status: "active", narration:notes, referenceNumber
    };
    const requestObject = {otherDetails, transaction, voucherType: 'Journal', voucherNumber};
    return requestObject;
}

export default transformData;
