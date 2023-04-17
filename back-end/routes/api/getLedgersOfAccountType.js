import {getDbController} from '../../db/accountingDb';

const getLedgersOfAccountType = async (req, res) => {
    try {
        const {orgId, accountType} = req.params;
        const dbController = await getDbController(orgId);
        // get ledger ids of all ledgers under income type
        // 1. get all ids of groups and sub-groups under the income account type.
        const accountTypeId = await dbController.accountTypes.getId(accountType);
        const accountGroupIds = await dbController.primaryGroup.getAccountTypeGroups(accountTypeId);
        // 2. get all ids of ledgers under income groups.
        const accountLedgers = await dbController.ledger.getGroupLedgers(accountGroupIds);
        res.json({ledgers:accountLedgers});
    } catch (error) {
        res.status(403).json({error});
    }
};

export default getLedgersOfAccountType;
