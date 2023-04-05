
export default class ClosingBalanceController{
    constructor(closingBalanceModel){
        this.model = closingBalanceModel;
    }

    async create(ledgerId, balance){
        try {
            const doc = await this.model.create({ledger: ledgerId, balance});
            return Promise.resolve(doc.id);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async delete(id, ledgerId=null){
        try {
            let doc;
            if(id) doc = await this.model.findByIdAndDelete(id);
            else doc = await this.model.findOneAndDelete({ledger:ledgerId});
            return Promise.resolve(doc); 
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async update(ledgerId, balance){
        try {
            const doc = await this.model.findOneAndUpdate({ledger: ledgerId}, {balance}, {upsert:true, new:true});
            return Promise.resolve(doc.id);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getBalance(ledgerId){
        try {
            const doc = await this.model.findOne({ledger:ledgerId});
            const balance = doc.balance || 0;
            return Promise.resolve(balance);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getAllBalances(){
        try {
            const ledgerBalances = {};
            const docs = await this.model.find();
            for (const doc of docs){
                ledgerBalances[doc.ledger] = doc.balance;
            }
            return Promise.resolve(ledgerBalances)
        } catch (error) {
            return Promise.reject(error);
        }
    }
}