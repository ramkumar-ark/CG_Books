
export const getUnpaidForEditPayment = (unpaidData, offsetData ,opBalDate) => {
    // transform offsetData
    const receiptOffsetData = transformOffsetData(offsetData, opBalDate);
    // filter out offsetData from unpaidData
    unpaidData.filter(e => filterFunction(e, receiptOffsetData));
    // combine the data
    return [...receiptOffsetData, ...unpaidData];
}

export function getUnpaidVouchersOfEntity(entityId, allUnpaidVouchers, customersObj, opBalDate) {
    const unpaid = allUnpaidVouchers
            .filter(e => e.transaction.otherDetails.linkedEntity === entityId)
            .map(e => ({date:e.transaction.transactionDate, voucherNumber:e.voucherNumber, 
                invoiceAmount:e.transaction.otherDetails.totalAmount,
                balanceDue:e.transaction.otherDetails.pendingAmount,
                referenceNumber:e.transaction.referenceNumber, transaction:e.transaction['_id'],
                dueDate:e.transaction.otherDetails.dueDate, 
            }));
    customersObj[entityId].otherDetails?.pendingAmount > 0 && unpaid.push({
        date:opBalDate, voucherNumber: 'Opening Balance', referenceNumber: 'Opening Balance',
        invoiceAmount: customersObj[entityId].otherDetails.totalAmount,
        balanceDue: customersObj[entityId].otherDetails.pendingAmount, dueDate:opBalDate
    });
    unpaid.sort((a,b) => new Date(a.date) - new Date(b.date));
    return unpaid;
}

function transformOffsetData(offsetData, opBalDate){
    const newOffsetData = [];
    offsetData.forEach(e => newOffsetData.push({
        date:e.voucherDate || opBalDate, 
        voucherNumber:e.voucherNumber, 
        invoiceAmount:e.voucherAmount, 
        balanceDue:e.pendingAmount,
        dueDate:e.dueDate || opBalDate, 
        transaction:e.transaction,
        receiptAmount: e.amount,
    }))
    return newOffsetData;
}

function filterFunction(data, offsetData){
    if (data.transaction){
        return !offsetData.find(e => e.transaction === data.transaction);
    }else{
        return !offsetData.find(e => e.voucherNumber === 'Opening Balance');
    }
}
