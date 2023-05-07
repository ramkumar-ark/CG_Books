
export default class BankDetailsController{
    constructor(BankDetailsModel){
        this.model = BankDetailsModel;
    }

    async create(BankDetails){
        try {
            const bankDetailsDoc = await this.model.create(BankDetails);
            return Promise.resolve(bankDetailsDoc.id);
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async getDetails(id) {
        try {
            const doc = await this.model.findById(id).populate('ledger');
            return Promise.resolve(doc);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getAllAccounts() {
        try {
            const docs = await this.model.find({});
            return Promise.resolve(docs);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async update(bankDetails, id){
        try {
            const doc = await this.model.findOneAndReplace({'_id':id}, {bankDetails});
            return Promise.resolve(doc);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async delete(id){
        try {
            await this.model.deleteOne({"_id": id});
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }
}