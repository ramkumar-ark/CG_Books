
const getUnpaidForEditReceipt = (unpaidData, offsetData ,opBalDate) => {
    // transform offsetData
    const receiptOffsetData = transformOffsetData(offsetData, opBalDate);
    // filter out offsetData from unpaidData
    unpaidData.filter(e => filterFunction(e, receiptOffsetData));
    // combine the data
    return [...receiptOffsetData, ...unpaidData];
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

export default getUnpaidForEditReceipt;
