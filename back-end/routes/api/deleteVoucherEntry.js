import { getDbController } from "../../db/accountingDb";
import updateClosingBalances from "../../utils/updateClosingBalances";
import updateOffsetTransactions from "./updateOffsetTransactions";

const deleteVoucherData = async (req, res) => {
    try {
        const {transactionId, otherDetailsId, voucherName, voucherDate, voucherNumber, 
            offsetTransactions, entityId} = req.body;
        const {orgId} = req.params;
        const dbController = await getDbController(orgId);
        if (voucherName === 'Sales' || voucherName === 'Purchase'){
            if (offsetTransactions && offsetTransactions.length > 0) 
                return res.status(403).json({error:'Payments are linked to this Invoice or Bill.'})
        }else{
            if (offsetTransactions.length > 0){
                req.body.isDelete = true;
                req.params.entityId = entityId;
                req.params.transactionId = transactionId;
                await updateOffsetTransactions(req, res, true);
            }
        }
        const doc = await dbController.voucherType
            .deleteVoucherData(transactionId, voucherDate, voucherName, voucherNumber);
        const transacDoc = await dbController.transaction.delete(transactionId);
        const detailsDoc = await dbController.otherDetails.delete(otherDetailsId);
        await updateClosingBalances(transacDoc, orgId);
        return res.json({message:`${voucherNumber} has been deleted.`});
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

export default deleteVoucherData;
