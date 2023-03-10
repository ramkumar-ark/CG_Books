
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

    async delete(id){
        try {
            await this.model.deleteOne({"_id": id});
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }
}