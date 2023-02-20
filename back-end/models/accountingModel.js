import typeSchema from "./accountTypes";
import primaryGroupSchema from "./primaryGroup";
import groupSchema from "./accountsGroup";
import ledgerSchema from "./ledgerSchema";

export default function createAccountingModels(dbInstance) {
    const AccountTypes = dbInstance.model('AccountTypes', typeSchema);
    const PrimaryGroups = dbInstance.model('PrimaryGroups', primaryGroupSchema);
    const Groups = dbInstance.model('Groups', groupSchema); 
    const Ledger = dbInstance.model('Ledger', ledgerSchema);

    return {
        AccountTypes,
        PrimaryGroups,
        Groups,
        Ledger,
        
    }
}
