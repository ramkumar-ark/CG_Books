
export default class LedgerController {
    constructor(LedgerModel){
        this.model = LedgerModel;
    }

    async create(name, groupId, description, opBalance){
        try {
            const ledger = await this.model.create({name, group:groupId, description, opBalance: opBalance || 0});
            return Promise.resolve(ledger.id);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getAllLedgers(){
        try {
            const ledgers = await this.model.find({});
            return Promise.resolve(ledgers);
        } catch (error) {
            return Promise.reject(error);
        }
    }

}