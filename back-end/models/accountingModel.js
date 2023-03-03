import typeSchema from "./accountTypes";
import primaryGroupSchema from "./primaryGroup";
import groupSchema from "./accountsGroup";
import ledgerSchema from "./ledgerSchema";
import contactSchema from "./contactSchema";
import addressSchema from "./addressSchema";
import entitySchema from "./entitySchema";
import bankDetailsSchema from "./bankDetailsSchema";
import closingBalanceSchema from "./closingBalanceSchema";
import voucherTypeSchema from "./voucherTypeSchema";
import transactionSchema from "./transactionSchema";
import otherDetailsSchema from "./otherDetailsSchema";

export default function createAccountingModels(dbInstance) {
    const AccountTypes = dbInstance.model('AccountTypes', typeSchema);
    const PrimaryGroups = dbInstance.model('PrimaryGroups', primaryGroupSchema);
    const Groups = dbInstance.model('Groups', groupSchema); 
    const Ledger = dbInstance.model('Ledger', ledgerSchema);
    const Contact = dbInstance.model('Contact', contactSchema);
    const Address = dbInstance.model('Address', addressSchema);
    const BankDetails = dbInstance.model('BankDetails', bankDetailsSchema);
    const Entity = dbInstance.model('Entity', entitySchema);
    const ClosingBalance = dbInstance.model('ClosingBalance', closingBalanceSchema);
    const VoucherType = dbInstance.model('VoucherType', voucherTypeSchema);
    const Transaction = dbInstance.model('Transaction', transactionSchema);
    const OtherDetails = dbInstance.model('OtherDetails', otherDetailsSchema);

    return {
        AccountTypes,
        PrimaryGroups,
        Groups,
        Ledger,
        Contact,
        Address,
        BankDetails,
        Entity,
        ClosingBalance,
        VoucherType,
        Transaction,
        OtherDetails,
    }
}
