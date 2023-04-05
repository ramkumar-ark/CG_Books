import { getDbController } from "../../db/accountingDb";
import updateClosingBalances from "../../utils/updateClosingBalances";

const updateVoucher = async (req, res) => {
    try {
        const {otherDetails, transaction, voucherType, voucherNumber} = req.body;
        const {orgId, transactionId, otherDetailsId} = req.params;
        const dbController = await getDbController(orgId);
        // update voucher number if it is modified.
        const doc = await dbController.voucherType.getVoucherData(transactionId, voucherType);
        const oldVoucherDate = doc.transaction.transactionDate;
        if (doc.voucherNumber !== voucherNumber){
            await dbController.voucherType
                .updateVoucherNumber(transactionId, voucherNumber, oldVoucherDate, voucherType);
        }
        await dbController.otherDetails.update(otherDetailsId, otherDetails);
        const voucherTypeId = await dbController.voucherType.getId(voucherType);
        const oldTransaction = await dbController.transaction.get(transactionId);
        const result = await dbController.transaction.update(
            transactionId, 
            {...transaction, otherDetailsId, voucherTypeId, createdBy:doc.transaction.createdBy}
        );
        console.log('updated transaction doc: ', oldTransaction);
        await updateClosingBalances(transaction, orgId, oldTransaction);
        res.json({message: 'success'});
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

export default updateVoucher;
