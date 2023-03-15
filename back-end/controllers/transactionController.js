
export default class TransactionController{
    constructor(transactionModel){
        this.model = transactionModel;
    }

    async create(
        {voucherTypeId, transactionDate, debits, credits, status, otherDetailsId, userId, narration, 
        referenceNumber, referenceDate}){
            try {
                const voucherType = voucherTypeId;
                const otherDetails = otherDetailsId;
                const createdBy = userId;
                const doc = await this.model.create({
                    voucherType, transactionDate, debits, credits, status, otherDetails, createdBy, narration,
                    referenceNumber, referenceDate,
                });
                return Promise.resolve(doc.id);    
            } catch (error) {
                return Promise.reject(error);
            }
    }

    async delete(id){
        try {
            const doc = await this.model.findByIdAndRemove(id);
            return Promise.resolve(doc);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async update(id, data){
        try {
            const voucherType = data.voucherTypeId;
            const otherDetails = data.otherDetailsId;
            const lastModifiedBy = data.userId;
            const lastModifiedOn = Date.now();
            const doc = await this.model.replaceOne({_id: id}, 
                {...data, voucherType, otherDetails, lastModifiedBy, lastModifiedOn});
            return Promise.resolve(doc);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getCustomerIncomeTransactions(customerLedgerId, incomeLedgerIds){
        try {
            const docs = await this.model.find(
                {
                    $and:[
                        {$or: [
                            {'debits':{$elemMatch: {ledger:customerLedgerId}}},
                            {'credits':{$elemMatch: {ledger:customerLedgerId}}}
                        ]},
                        {$or:[
                            {'debits': {$elemMatch: {ledger:{$in: incomeLedgerIds}}}},
                            {'credits': {$elemMatch:{ledger:{$in: incomeLedgerIds}}}},
                        ]},
                    ]
                }
            ).exec();
            return Promise.resolve(docs);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getCustomerTransactions(customerLedgerId){
        try {
            const docs = await this.model.find({
                $or:[
                {'debits':{$elemMatch: {ledger:customerLedgerId}}},
                {'credits':{$elemMatch: {ledger:customerLedgerId}}},
                ]
            })
            .sort('transactionDate')
            .populate({path:'voucherType', select: 'primaryType'})
            .populate({path:'otherDetails'}).exec();
            return Promise.resolve(docs);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}