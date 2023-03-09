import { getDbController } from "../../db/accountingDb";


const getVouchers = async (req, res) => {
    try {
        const {orgId, voucherName} = req.params;
        const dbController = await getDbController(orgId);
        // {date, invoiceNumber, orderNumber, name, status, dueDate, amount, balanceDue}
        const vouchers = await dbController.voucherType.getVouchers(voucherName);
        let result = [];
        for (const voucher of vouchers){
            result.push({
                date:voucher.transaction.transactionDate,
                invoiceNumber: voucher.voucherNumber,
                orderNumber: voucher.transaction.otherDetails.orderNumber,
                name: voucher.transaction.otherDetails.partyName,
                status: voucher.transaction.otherDetails.status,
                dueDate: voucher.transaction.otherDetails.dueDate,
                amount: voucher.transaction.otherDetails.totalAmount,
                balanceDue: voucher.transaction.otherDetails.pendingAmount,
                transactionId: voucher.transaction['_id'],
            });
        }
        res.json({vouchers:result});
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

export default getVouchers;
