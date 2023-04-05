import { getDbController } from "../../db/accountingDb";

const deleteMaster = async (masterId, controller) => {
    try {
        if (Array.isArray(masterId)) {
            for (const id of masterId){
                await deleteMaster(id, controller);
            }
        } else {
            await controller.delete(masterId);
        }
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
};

const deleteEntity = async (req, res) => {
    try {
        const { orgId, entityId }= req.params;
        const dbController = await getDbController(orgId);
        const entity = await dbController.entity.getEntity(entityId);
        const { ledger, addresses, contacts, primaryContact, bankDetails, otherDetails } = entity;
        const isNotEmpty = await dbController.transaction.isTransactionPresentForLedger(ledger);
        if (isNotEmpty) res.json({result:'failed', message:'Ledger has transactions.'});
        else {
            const associatedMasters = [
                {masterId:ledger, controller:dbController.ledger},
                {masterId:addresses, controller:dbController.address},
                {masterId:contacts, controller:dbController.contact},
                {masterId:primaryContact, controller:dbController.contact},
                {masterId:bankDetails, controller:dbController.bankDetails},
                {masterId:otherDetails, controller:dbController.otherDetails},
            ];
            for (const master of associatedMasters){
                if (master.masterId) await deleteMaster(master.masterId, master.controller);
            }
            await dbController.closingBalance.delete(null, ledger);
            await dbController.entity.delete(entityId);
            res.json({result:'success'});
        }
    } catch (error) {
        res.status(403).json({error});
    }
};

export default deleteEntity;
