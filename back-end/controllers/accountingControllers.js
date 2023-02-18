// import all the controller classes relating to accounting database
import AccountTypesController from "./accountTypes";
import AccountGroupsController from "./accountsGroup";
import PrimaryGroupsController from "./primaryGroup";

export default function createAccountingControllers(modelsObject) {
    const accountTypes = new AccountTypesController(modelsObject.AccountTypes);
    const group = new AccountGroupsController(modelsObject.Groups);
    const primaryGroup = new PrimaryGroupsController(modelsObject.PrimaryGroups);

    const createDefaultPrimaryGroups = async() => {
        const defaultGroups = {
            Assets: ['Other Asset', 'Other Current Asset', 'Cash', 'Bank', 'Fixed Asset', 'Stock', 'Payment Clearing'],
            Liability: ['Other Current Liability', 'Credit Card', 'Long Term Liability', 'Other Liability'],


        };
        try {
            await Object.keys(defaultGroups).forEach(
                async (typeName) => {
                    const typeId = await accountTypes.getId(typeName);
                    defaultGroups[typeName].forEach(async (groupName) => {
                        await primaryGroup.create(groupName, typeId);
                    });
                }
            );
            return Promise.resolve();
        } catch (error) {
            return Promise.reject();
        }
    };

    const createPrimaryMasters = async() => {
        await accountTypes.createDefaultTypes();
        createDefaultPrimaryGroups();
    };

    const utils = {
        createPrimaryMasters,
    };
    return {
        accountTypes,
        group,
        primaryGroup,

        utils
    };
}