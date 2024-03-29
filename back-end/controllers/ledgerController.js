
export default class LedgerController {
    constructor(LedgerModel){
        this.model = LedgerModel;
    }

    async create(name, groupId, description, opBalance, isReadOnly){
        try {
            const ledger = await this.model.create({name, group:groupId, description, opBalance: opBalance || 0, isReadOnly});
            return Promise.resolve(ledger.id);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async update(name, groupId, description, opBalance, ledgerId){
        try {
            const ledger = await this.model.findOneAndUpdate({'_id':ledgerId}, {name, group:groupId, description, opBalance: opBalance || 0}, {new:true});
            return Promise.resolve(ledger);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getLedgerByName(ledgerName){
        try {
            const ledger = await this.model.findOne({'name': ledgerName});
            return Promise.resolve(ledger);
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

    async delete(id){
        try {
            await this.model.deleteOne({"_id": id});
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async deleteLedgers(ledgerIds) {
        try {
            const result = await this.model.deleteMany({'_id': {'$in': ledgerIds}}, { writeConcern: { w: "majority", j: true } });
            console.log(result);
            return Promise.resolve(result.deletedCount);   
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getGroupLedgers(groupIds){
        try {
            const ledgers = await this.model.find({'group':{'$in':groupIds}}).populate({path:'group', select:'name'});
            return Promise.resolve(ledgers);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getGroupLedgerIds(groupIds){
        try {
            const ledgers = await this.model.find({'group':{'$in':groupIds}}, {'_id':1});
            const ledgerIds = ledgers.map(e => e.id);
            return Promise.resolve(ledgerIds);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getOpeningBalance(ledgerId){
        try {
            const opBalance = await this.model.findOne({'_id': ledgerId}, {'opBalance': 1, '_id':0}).exec();
            return Promise.resolve(opBalance.opBalance);
        } catch (error) {
            return Promise.reject(error);
        }
    }

}