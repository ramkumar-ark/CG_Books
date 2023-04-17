import { getDbController } from "../../db/accountingDb";

const updateOffsetTransactions = async (req, res, isMiddleware=false) => {
    try {
        const { orgId, entityId, transactionId } = req.params;
        const {offsetTransactions, isDelete} = req.body;
        const dbController = await getDbController(orgId);
        const transactionIds = [];
        const offsetTransactionsObj = {};
        for (const transac of offsetTransactions){
            offsetTransactionsObj[transac.transaction || 'opBal'] = transac.amount;
            if(transac.transaction) transactionIds.push(transac.transaction);
        }
        const otherDetailsIds = await dbController.transaction.getOtherDetailsIds(transactionIds);
        for (const document of otherDetailsIds){
            await dbController.otherDetails.addOffSetTransaction(
                document.otherDetails, 
                {transaction:transactionId, amount:offsetTransactionsObj[document['id']]},
                !!isDelete,
            );
        }
        if (offsetTransactionsObj['opBal']){
            const entity = await dbController.entity.getEntity(entityId);
            await dbController.otherDetails.addOffSetTransaction(
                entity.otherDetails['_id'], 
                {transaction:transactionId, amount:offsetTransactionsObj['opBal']},
                isDelete,
            );
        }
        if (isMiddleware) return Promise.resolve();
        res.json({message:'success'});
    } catch (error) {
        console.log(error);
        if (isMiddleware) return Promise.reject(error);
        res.status(403).json({error});
    }
};

export default updateOffsetTransactions;
