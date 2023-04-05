import { getDbController } from "../../db/accountingDb";


const getVouchers = async (req, res) => {
    try {
        const {orgId, voucherName} = req.params;
        const dbController = await getDbController(orgId);
        // {date, invoiceNumber, orderNumber, name, status, dueDate, amount, balanceDue}
        const vouchers = await dbController.voucherType.getVouchers(voucherName);
        const offsetTransactionIds = new Set();
        vouchers.forEach(
            e => e.transaction.otherDetails.offSetTransactions.forEach(
                elem => elem.transaction && offsetTransactionIds.add(elem.transaction.toString()))
        );
        const offsetVoucherNumbers = await dbController.voucherType.getVoucherNumbers(
            Array.from(offsetTransactionIds)
        );
        let result = [];
        for (const voucher of vouchers){
            const offsetTransactions = voucher.transaction.otherDetails.offSetTransactions.map(e => ({
                voucherNumber: e.transaction ? offsetVoucherNumbers[e.transaction.toString()] : 'Opening Balance',
                transaction: e.transaction && e.transaction.toString(), amount: e.amount,
            }))
            result.push({
                date:voucher.transaction.transactionDate,
                voucherNumber: voucher.voucherNumber,
                referenceNumber: voucher.transaction.referenceNumber,
                name: voucher.transaction.otherDetails.partyName,
                status: voucher.transaction.otherDetails.status,
                receiptMode: voucher.transaction.otherDetails.receiptMode,
                dueDate: voucher.transaction.otherDetails.dueDate,
                amount: voucher.transaction.otherDetails.totalAmount,
                pendingAmount: voucher.transaction.otherDetails.pendingAmount,
                offsetTransactions,
                transactionId: voucher.transaction['_id'],
                createdOn: voucher.transaction.createdOn,
                modifiedOn: voucher.transaction.lastModifiedOn,
            });
        }
        res.json({vouchers:result});
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

export default getVouchers;
