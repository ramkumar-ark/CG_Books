import { getDbController } from "../../db/accountingDb";
import updateLedgerClosingBalance from "../../utils/updateLedgerClosingBalance";

const updateBankAccount = async (req, res) => {
    try {
        const {orgId, bankDetailsId} = req.params;
        const {name, beneficiaryName, accountNumber: accountNo, bankName, ifsc, description, 
            opBalance} = req.body;
        const dbController = await getDbController(orgId);
        const bankDetailsDoc = await dbController.bankDetails.getDetails(bankDetailsId);
        const bankLedgerId = bankDetailsDoc.ledger['_id'];
        const bankDetails = {beneficiaryName, bankName, accountNo, ifsc, ledger:bankLedgerId};
        const bankGroupId = bankDetailsDoc.ledger.group;
        await dbController.ledger.update(name, bankGroupId, description, opBalance, bankLedgerId);
        await dbController.bankDetails.update(bankDetails, bankDetailsId);
        opBalance && updateLedgerClosingBalance(orgId, bankLedgerId);
        res.json({message:'success'});
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

export default updateBankAccount;
