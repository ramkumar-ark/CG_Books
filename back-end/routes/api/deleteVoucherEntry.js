import { getDbController } from "../../db/accountingDb";

const deleteVoucherData = async (req, res) => {
    try {
        const {transactionId, otherDetailsId, voucherName, voucherDate, voucherNumber} = req.body;
        const {orgId} = req.params;
        const dbController = await getDbController(orgId);
        const doc = await dbController.voucherType
            .deleteVoucherData(transactionId, voucherDate, voucherName, voucherNumber);
        const transacDoc = await dbController.transaction.delete(transactionId);
        const detailsDoc = await dbController.otherDetails.delete(otherDetailsId);
        return res.json({message:`${voucherNumber} has been deleted.`});
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

export default deleteVoucherData;
