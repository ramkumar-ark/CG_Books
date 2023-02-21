// import all the controller classes relating to accounting database
import AccountTypesController from "./accountTypes";
import AccountGroupsController from "./accountsGroup";
import PrimaryGroupsController from "./primaryGroup";
import LedgerController from "./ledgerController";
import getMasters from "../data/getMasters";

export default function createAccountingControllers(modelsObject) {
    const accountTypes = new AccountTypesController(modelsObject.AccountTypes);
    const group = new AccountGroupsController(modelsObject.Groups);
    const primaryGroup = new PrimaryGroupsController(modelsObject.PrimaryGroups);
    const ledger = new LedgerController(modelsObject.Ledger);

    const createDefaultPrimaryGroups = async() => {
        const defaultGroups = {
            Assets: ['Other Asset', 'Accounts Receivable', 'Other Current Asset', 'Investment', 'Cash', 'Bank', 'Fixed Asset', 'Stock', 'Payment Clearing'],
            Liability: ['Other Current Liability', 'Accounts Payable', 'Credit Card', 'Long Term Liability', 'Other Liability'],
            Equity: ['Equity'],
            Income: ['Income', 'Other Income'],
            Expense: ['Expense', 'Cost Of Goods Sold', 'Other Expense']
        };
        try {
            for (const typeName in defaultGroups){
                const typeId = await accountTypes.getId(typeName);
                for (const groupName of defaultGroups[typeName]){
                    await primaryGroup.create(groupName, typeId);
                }
            }
            console.log('Primary groups created');
            return Promise.resolve();
        } catch (error) {
            return Promise.reject();
        }
    };

    const createLedgerMasters = async() => {
        try {
            const { ledgerMasters: ledgerObjs } = await getMasters();
            for (const record of ledgerObjs){
                const {name, group, description} = record;
                const { id:groupId } = await primaryGroup.getByName(group);
                await ledger.create(name, groupId, description);
            }
            console.log('ledger masters created.');
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const createPrimaryMasters = async() => {
        await accountTypes.createDefaultTypes();
        await createDefaultPrimaryGroups();
        await createLedgerMasters();
    };

    const getAllMasters = async() => {
        try {
            const ledgers = await ledger.getAllLedgers();
            const groups = await primaryGroup.getAllGroups();
            const types = await accountTypes.getAllAccountTypes();
            return Promise.resolve({ledgers, groups, types});
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const utils = {
        createPrimaryMasters,
        getAllMasters,
    };
    return {
        accountTypes,
        group,
        primaryGroup,
        ledger,

        utils
    };
}