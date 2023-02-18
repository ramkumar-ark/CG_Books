import typeSchema from "./accountTypes";
import primaryGroupSchema from "./primaryGroup";
import groupSchema from "./accountsGroup";

export default function createAccountingModels(dbInstance) {
    const AccountTypes = dbInstance.model('AccountTypes', typeSchema);
    const PrimaryGroups = dbInstance.model('PrimaryGroups', primaryGroupSchema);
    const Groups = dbInstance.model('Groups', groupSchema); 
    

    return {
        AccountTypes,
        PrimaryGroups,
        Groups,

    }
}
