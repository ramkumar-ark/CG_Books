
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

    async get(id){
        try {
            const doc = await this.model.findById(id).populate('voucherType').populate('otherDetails').exec();
            return Promise.resolve(doc);
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
            const doc = await this.model.updateOne({_id: id}, 
                {...data, voucherType, otherDetails, lastModifiedBy, lastModifiedOn});
            return Promise.resolve(doc);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getCommonTransactions(customerLedgerId, incomeLedgerIds){
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

    async getLedgerTransactions(ledgerIds){
        try {
            const docs = await this.model.find({
                $or:[
                {'debits':{$elemMatch: {ledger:{$in:ledgerIds}}}},
                {'credits':{$elemMatch: {ledger:{$in:ledgerIds}}}},
                ]
            })
            .sort('transactionDate')
            .populate({path:'voucherType', select: 'primaryType name'})
            .populate({path:'otherDetails'}).exec();
            return Promise.resolve(docs);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async isTransactionPresentForLedger(ledgerId){
        try {
            const doc = await this.model.findOne({
                $or:[
                    {'debits':{$elemMatch: {ledger:ledgerId}}},
                    {'credits':{$elemMatch: {ledger:ledgerId}}},
                    ]
            }).exec();
            return Promise.resolve(!!doc)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getOtherDetailsIds(transactionIds){
        try {
            const docs = await this.model.find({'_id': {$in:transactionIds}}, {'otherDetails':1}).exec();
            return Promise.resolve(docs);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getReferenceNumbers(transactionIds) {
        try {
            const docs = await this.model.find({'_id': {$in:transactionIds}}, {'referenceNumber':1}).exec();
            const referenceNumbers = {};
            for (const doc of docs)
                referenceNumbers[doc.id] = doc.referenceNumber;
            return Promise.resolve(referenceNumbers);
        } catch (error) {
            return Promise.reject(error);            
        }
    }
}