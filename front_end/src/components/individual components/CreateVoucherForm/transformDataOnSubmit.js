
function transformDataOnSubmit(formData, tableTotals, selectedEntity, requiredLedgerIds){
    const {subject, notes, termsAndConditions, orderNumber, items:itemDetails, discount} = formData;
    const linkedEntity = formData.vendor || formData.customer;
    const partyName = selectedEntity.name;
    const billingAddress = selectedEntity.addresses.find((e) => e.type === "billing");
    const shippingAddress = selectedEntity.addresses.find((e) => e.type === "shipping");
    const {discount:discountAmount, round, total:totalAmount} = tableTotals;
    const creditTerms = {value:formData.creditPeriod.value, unit:formData.creditPeriod.unit}
    const dueDate = formData.creditPeriod.dueDate.toDate().toISOString();
    const otherDetails = {
        linkedEntity, partyName, shippingAddress, billingAddress, subject, notes, termsAndConditions,
        orderNumber, totalAmount:Number(totalAmount), itemDetails, creditTerms, dueDate, status:'unPaid', 
        discount,
    };

    const transactionDate = formData.voucherDate.toDate().toISOString();
    const {debits, credits} = getDebitsAndCredits(selectedEntity.ledger['_id'], requiredLedgerIds, 
                                itemDetails, totalAmount, discountAmount, round, selectedEntity.type);
    const narration = selectedEntity.type === 'customer' ? subject : notes;
    const referenceNumber = selectedEntity.type === 'customer' ? orderNumber : formData.voucherNumber;
    const transaction = {
        transactionDate, debits, credits, status: "active", narration, referenceNumber
    };

    const voucherNumber = selectedEntity.type === 'customer' && formData.voucherNumber;
    const voucherType = selectedEntity.type === 'customer' ? "Sales" : "Purchase";
    const requestObject = {otherDetails, transaction, voucherType, voucherNumber};
    console.log(requestObject);
    return requestObject;
}

function getDebitsAndCredits(entityLedgerId, otherLedgerIds, itemsDetailList, totalAmount, discount, 
    rounding, entityType){
    const entriesList1 = [];
    const entriesList2 = [];
    const {otherChargesLedgerId, salesDiscountLedgerId, purchaseDiscountLedgerId} = otherLedgerIds;
    entriesList1.push({ledger:entityLedgerId, amount: Math.abs(Number(totalAmount))});
    itemsDetailList.forEach(e => entriesList2.push({ledger:e.ledger, amount:Math.abs(e.amount)}))
    if (rounding < 0) 
        entriesList1.push({ledger: otherChargesLedgerId, amount:Math.abs(Number(rounding))});
    else if (rounding >0) 
        entriesList2.push({ledger: otherChargesLedgerId, amount:Number(rounding)});
    if (discount)
        entityType === 'customer'
        ?   entriesList1.push({ledger: salesDiscountLedgerId, amount:Math.abs(Number(discount))})
        :   entriesList1.push({ledger: purchaseDiscountLedgerId, amount:Math.abs(Number(discount))});
    if (entityType === 'customer') return {debits:entriesList1, credits:entriesList2};
    else return {debits:entriesList2, credits:entriesList1};
}

export default transformDataOnSubmit;
