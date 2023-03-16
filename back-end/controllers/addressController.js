
export default class AddressController{
    constructor(AddressModel){
        this.model = AddressModel;
    }

    async create(addressDetails){
        try {
            const address = await this.model.create(addressDetails);
            return Promise.resolve(address.id);
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async update(addressDetails, addressId){
        try {
            const address = await this.model.findOneAndReplace({'_id': addressId}, addressDetails, {new:true});
            return Promise.resolve(address);
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