import { getDbController } from "../../db/accountingDb";

const getVoucherData = async (req, res) => {
    try {
        const {orgId, transactionId, voucherName} = req.params;
        const dbController = await getDbController(orgId);
        const doc = await dbController.voucherType.getVoucherData(transactionId, voucherName);
        // {voucherNumber, transaction:{transactionDate}, otherDetails:{dueDate, orderNumber, partyName, billingAddress, shippingAddress, itemDetails, totalAmount, customerNotes, termsAndConditions}, subTotal, discount, rounding,  }
        const voucherNumber = doc.voucherNumber;
        const {transactionDate, debits, credits, referenceNumber, narration:subject, referenceDate}
            = doc.transaction;
        const transaction = {transactionDate, debits, credits, referenceNumber, narration:subject, 
            referenceDate};
        const otherDetails = JSON.parse(JSON.stringify(doc.transaction.otherDetails));
        otherDetails.customerNotes = doc.transaction.otherDetails.notes;
        delete otherDetails.notes;
        otherDetails.offSetTransactions = await getOffsetTransactions(
            doc.transaction.otherDetails.offSetTransactions, dbController, doc.transaction.otherDetails.linkedEntity);
        const {subTotal, discount, rounding} = calculateInvoiceFigures(
            doc.transaction.debits, doc.transaction.credits, doc.transaction.otherDetails.totalAmount);
        const resObj = {
            voucherNumber, voucherName, transaction, otherDetails, subTotal, discount, rounding
        };
        console.log(otherDetails.offSetTransactions);
        res.json({voucher:resObj});
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

function calculateInvoiceFigures(debits, credits, totalAmount){
    let subTotal, discount, rounding;
    subTotal = discount = rounding = 0;
    for (const entry of [...debits, ...credits]){
        switch (entry.ledger.name) {
            case 'Sales':
                subTotal = entry.amount;
                break;
            case 'Discount':
                discount = entry.amount * -1;
                break;
            case 'Other Charges':
                rounding = entry.amount;
            default:
                break;
        }
        if ((subTotal + discount + rounding) !== totalAmount) rounding = rounding * -1;
    }
    return {subTotal, discount, rounding};
}

async function getOffsetTransactions(offSetTransactions, dbController, entityId){
    try {
        const offsetTransactionIds = new Set();
        offSetTransactions.forEach(
            elem => elem.transaction && offsetTransactionIds.add(elem.transaction.toString())
        );
        const offsetVoucherNumbers = await dbController.voucherType.getVoucherNumbers(
            Array.from(offsetTransactionIds)
        );
        const offsetTransactions = offSetTransactions.map(e => ({
            voucherNumber: e.transaction ? offsetVoucherNumbers[e.transaction.toString()] : 'Opening Balance',
            transaction: e.transaction && e.transaction.toString(), amount: e.amount,
        }));
        let index = 0;
        for (const transac of offsetTransactions){
            if (transac.transaction){
                const doc = await dbController.transaction.get(transac.transaction);
                offsetTransactions[index].voucherDate = doc.transactionDate;
                offsetTransactions[index].voucherAmount = doc.otherDetails.totalAmount;
                offsetTransactions[index].pendingAmount = doc.otherDetails.pendingAmount 
                    + offSetTransactions[index].amount;
                offsetTransactions[index].dueDate = doc.otherDetails.dueDate;
            }else{
                const doc = await dbController.entity.getEntityOpeningBalanceStatus(entityId);
                offsetTransactions[index].voucherAmount = doc.openingBalance;
                offsetTransactions[index].pendingAmount = doc.pendingBalance + offSetTransactions[index].amount;
            }
            index++;
        }
        console.log(offsetTransactions);
        return Promise.resolve(offsetTransactions);
    } catch (error) {
        return Promise.reject(error);
    }
};

export default getVoucherData;
