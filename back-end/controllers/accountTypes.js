
export default class AccountTypesController {
    constructor(accountTypesModel) {
        this.model = accountTypesModel;
    }

    async createType(name){
        await this.model.create({name});
    }

    async getId(name){
        try {
            const group = await this.model.findOne({name}).exec();
            return Promise.resolve(group.id);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async createDefaultTypes(){
        await ["Assets", "Liability", "Equity", "Expense", "Income"]
            .map(async (elem) => {
                await this.createType(elem)
            });
    }

}