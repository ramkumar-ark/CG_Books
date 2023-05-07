import { getDbController } from "../../db/accountingDb";

const getBankAccount = async (req, res) => {
    try {
        const {orgId, bankDetailsId} = req.params;
        const dbController = await getDbController(orgId);
        const bankDetailsDocument = await dbController.bankDetails.getDetails(bankDetailsId);
        const {name, description, opBalance} = bankDetailsDocument.ledger;
        const {beneficiaryName, accountNo, bankName, ifsc} = bankDetailsDocument;
        const responseObj = {name, description, opBalance, beneficiaryName, accountNo, bankName, ifsc};
        res.json(responseObj);
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

export default getBankAccount;