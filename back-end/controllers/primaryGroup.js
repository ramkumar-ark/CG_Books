
export default class PrimaryGroupsController {
    constructor(primaryGroupModel) {
        this.model = primaryGroupModel;
    }

    async getByName(name){
        try {
            const group = await this.model.findOne({ name }).exec();
            if (group) return Promise.resolve(group);
            return Promise.reject();
        } catch (error) {
            Promise.reject(error);
        }
    }

    async getById(id){
        try {
            const group = await this.model.findById(id).exec();
            if (group) return Promise.resolve(group);
            return Promise.reject();
        } catch (error) {
            Promise.reject(error);
        }
    }

    async isPresent(name){
        try {
            const group = await this.findOne({ name }).exec();
            return Promise.resolve(!!group);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async create(name, typeId){
        try {
            const group = await this.model.findOne({ name }).exec();
            if (!group) {
                const newGroup = await this.model.create({name, category: typeId});
                return Promise.resolve(newGroup.id);
            }else{
                return Promise.resolve(group.id);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getAllGroups(){
        try {
            const groups = await this.model.find({});
            return Promise.resolve(groups);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}