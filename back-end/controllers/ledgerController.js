
export default class LedgerController {
    constructor(LedgerModel){
        this.model = LedgerModel;
    }

    async create(name, groupId, description, opBalance){
        try {
            console.log(name);
            const ledger = await this.model.create({name, group:groupId, description, opBalance: opBalance || 0});
            console.log(ledger);
            return Promise.resolve(ledger.id);
        } catch (error) {
            return Promise.reject(error);
        }
    }

}