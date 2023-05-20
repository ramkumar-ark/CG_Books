import { getDbController } from "../../db/accountingDb";

const getLedgersOfGroup = async (req, res, next) => {
    try {
        const {orgId, groupId} = req.params;
        const dbController = await getDbController(orgId);
        const groupIds = req.result || [groupId];
        const ledgers = [];
        for (const grpId of groupIds) {
            const subGroupIds = await dbController.primaryGroup.getAllSubGroupsOfGroup(grpId);
            const ledgersOfGroup = await dbController.ledger.getGroupLedgers([grpId, ...subGroupIds]);
            ledgers.push(ledgersOfGroup);
        }
        req.result = ledgers;
        next();
    } catch (error) {
        res.status(403).json(error);
    }
};

export default getLedgersOfGroup;
