
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
        const typesArray = ["Assets", "Liability", "Equity", "Expense", "Income"];
        for (const elem of typesArray) {
            await this.createType(elem);
        }
        console.log('Account Types Created')
    }
}