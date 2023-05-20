import { getDbController } from "../../db/accountingDb";
import updateLedgerClosingBalance from "../../utils/updateLedgerClosingBalance";
import updateOpeningBalanceDifference from "../../utils/updateOpeningBalanceDifference";

const updateLedgerAccount = async (req, res) => {
    try {
        const {orgId, ledgerId} = req.params;
        const {name, group, description, opBalance} = req.body;
        const dbController = await getDbController(orgId);
        const docId = await dbController.ledger.update(name, group, description, opBalance, ledgerId);
        opBalance && await updateLedgerClosingBalance(orgId, ledgerId);
        opBalance && await updateOpeningBalanceDifference(orgId);
        res.json({documentId:docId});
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

export default updateLedgerAccount;
