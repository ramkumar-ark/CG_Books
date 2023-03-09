
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
            const doc = await this.model.replaceOne({_id: id}, data);
            return Promise.resolve(doc);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}