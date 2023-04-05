
export default class OtherDetailsController{
    constructor(otherDetailsModel){
        this.model = otherDetailsModel;
    }

    async create(otherDetailsObject){
        try {
            const doc = await this.model.create(otherDetailsObject);
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
            const doc = await this.model.findByIdAndUpdate(id, data);
            // await doc.updateOne(data);
            return Promise.resolve(doc);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async addOffSetTransaction(id, offsetTransaction, isDelete=false){
        try {
            // updateQuery = isDelete ? $push:{offSetTransactions:offsetTransaction}}
            const doc = await this.model.findByIdAndUpdate(id, 
                {[isDelete ? '$pull' : '$push']:{offSetTransactions:offsetTransaction}});
            return Promise.resolve(doc);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    // async deleteOffSetTransaction(id, offsetTransaction)
}