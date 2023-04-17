import { getDbController } from "../db/accountingDb";
import updateLedgerClosingBalance from "./updateLedgerClosingBalance";

const updateOpeningBalanceDifference = async (orgId) => {
    try {
        const openingBalanceDifferenceLedgerName = 'Opening Balance Adjustments';
        const dbController = await getDbController(orgId);
        const ledgerDoc = await dbController.ledger.getLedgerByName(openingBalanceDifferenceLedgerName);
        await updateLedgerClosingBalance(orgId, ledgerDoc.id);    
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
};

export default updateOpeningBalanceDifference;
