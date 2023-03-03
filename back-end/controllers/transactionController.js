
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
}