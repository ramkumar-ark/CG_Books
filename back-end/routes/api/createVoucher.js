import { getDbController } from "../../db/accountingDb";

const createVoucher = async (req, res) => {
    let createdDocuments = [];
    
    try {
        const {otherDetails, transaction, voucherType, voucherNumber, orgId} = req.body;
        const dbController = await getDbController(orgId);
        // create other Details
        const otherDetailsId = await dbController.otherDetails.create(otherDetails);
        createdDocuments.push({controller:"otherDetails", docId:otherDetailsId});
        // create transaction
        const voucherTypeId = await dbController.voucherType.getId(voucherType);
        const transactionId = await dbController.transaction.create({...transaction, otherDetailsId, voucherTypeId});
        createdDocuments.push({controller:"transaction", docId:transactionId});
        // add transaction to sales voucher
        const doc = await dbController.voucherType.addVoucherTransaction(
            transaction.transactionDate, voucherType, transactionId, voucherNumber
        );
        res.json({transactionId});
    } catch (error) {
        console.log(error);
        const dbController = await getDbController(req.body.orgId);
        try {
            for (const doc of createdDocuments){
                await dbController[doc.controller].delete(doc.docId);
            }
            return res.status(403).json({error});
        } catch (err) {
            return res.status(403).json({err});
        }
    }
};

export default createVoucher;
