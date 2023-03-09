import { getDbController } from "../../db/accountingDb";

const getVoucherData = async (req, res) => {
    try {
        const {orgId, transactionId, voucherName} = req.params;
        const dbController = await getDbController(orgId);
        const doc = await dbController.voucherType.getVoucherData(transactionId, voucherName);
        // {voucherNumber, transaction:{transactionDate}, otherDetails:{dueDate, orderNumber, partyName, billingAddress, shippingAddress, itemDetails, totalAmount, customerNotes, termsAndConditions}, subTotal, discount, rounding,  }
        const voucherNumber = doc.voucherNumber;
        const transaction = {
            transactionDate: doc.transaction.transactionDate, subject:doc.transaction.narration};
        const otherDetails = doc.transaction.otherDetails;
        otherDetails.customerNotes = doc.transaction.otherDetails.notes;
        delete otherDetails.notes;
        let subTotal, discount, rounding;
        subTotal = discount = rounding = 0;
        for (const entry of [...doc.transaction.debits, ...doc.transaction.credits]){
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
            if ((subTotal + discount + rounding) !== otherDetails.totalAmount) rounding = rounding * -1;
        }
        const resObj = {
            voucherNumber, voucherName, transaction, otherDetails, subTotal, discount, rounding
        };
        res.json({voucher:resObj});
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

export default getVoucherData;
