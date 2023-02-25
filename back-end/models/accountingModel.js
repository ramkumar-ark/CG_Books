import typeSchema from "./accountTypes";
import primaryGroupSchema from "./primaryGroup";
import groupSchema from "./accountsGroup";
import ledgerSchema from "./ledgerSchema";
import contactSchema from "./contactSchema";
import addressSchema from "./addressSchema";
import entitySchema from "./entitySchema";
import bankDetailsSchema from "./bankDetailsSchema";

export default function createAccountingModels(dbInstance) {
    const AccountTypes = dbInstance.model('AccountTypes', typeSchema);
    const PrimaryGroups = dbInstance.model('PrimaryGroups', primaryGroupSchema);
    const Groups = dbInstance.model('Groups', groupSchema); 
    const Ledger = dbInstance.model('Ledger', ledgerSchema);
    const Contact = dbInstance.model('Contact', contactSchema);
    const Address = dbInstance.model('Address', addressSchema);
    const BankDetails = dbInstance.model('BankDetails', bankDetailsSchema);
    const Entity = dbInstance.model('Entity', entitySchema);

    return {
        AccountTypes,
        PrimaryGroups,
        Groups,
        Ledger,
        Contact,
        Address,
        BankDetails,
        Entity,
    }
}
