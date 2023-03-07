

const transformData = (data) => {
    const linkedEntity = data.customer;
    const {partyName, shippingAddress, billingAddress, subject, customerNotes, termsAndConditions, 
        orderNumber, totalAmount} = data;
    const itemDetails = data.items.map(item => ({details: item.itemDetails, quantity: item.itemQuantity, rate: item.itemRate, amount: Number(item.itemAmount)}));
    const creditTerms = {value:data.creditPeriod.value, unit:data.creditPeriod.unit}
    const dueDate = data.creditPeriod.dueDate.toDate().toISOString();
    const status = "unPaid";
    const pendingAmount = totalAmount;
    const otherDetails = {
        linkedEntity, partyName, shippingAddress, billingAddress, subject, customerNotes, termsAndConditions,
        orderNumber, totalAmount, itemDetails, creditTerms, dueDate, status, pendingAmount
    };
    const voucherType = "Sales";
    const transactionDate = data.invoiceDate.toDate().toISOString();
    const debits = [];
    const credits = [];
    debits.push({ledger:data.customerObj.ledger['_id'], amount: Math.abs(totalAmount)});
    credits.push({ledger:data.concernedLedgers.salesLedgerId, amount: Number(data.subTotal)})
    if (data.roundingOff < 0) 
        debits.push({ledger: data.concernedLedgers.otherChargesLedgerId, amount:Math.abs(data.roundingOff)});
    else if (data.roundingOff >0) 
        credits.push({ledger: data.concernedLedgers.otherChargesLedgerId, amount:data.roundingOff});
    if (data.discountAmount)
        debits.push({ledger: data.concernedLedgers.discountLedgerId, amount:Math.abs(Number(data.discountAmount))});
    
    const narration = subject;
    const referenceNumber = data.orderNumber;
    const transaction = {
        transactionDate, debits, credits, status: "active", userId:data.userId, narration, referenceNumber
    };
    const requestObject = {otherDetails, transaction, voucherType, voucherNumber:data.invoiceNumber};
    return requestObject;
};      


export default transformData;