import { Schema } from "mongoose";

const ledgerSchema = new Schema({
    name:{type: String, required: true, unique: true},
    group:{type: Schema.Types.ObjectId, ref: 'Groups', required: true},
    description: {type: String, required: true},
    opBalance:{type: Number, default: Number(0)},
});

ledgerSchema.statics.updateOpeningBalanceDifference = async function(){
    try {
        const docs = await this.find({}, {opBalance:1});
        const openingBalanceDifference = docs.reduce((pv, doc) => pv + doc.opBalance,0);
        if (openingBalanceDifference !== 0) {
            const opBalOffsetLedgerDoc = await this.findOne({name:'Opening Balance Adjustments'}, {opBalance:1});
            const prevOpBalDiff = opBalOffsetLedgerDoc.opBalance;
            const updatedOpBalDiff = prevOpBalDiff - openingBalanceDifference;
            await this.findOneAndUpdate({name:'Opening Balance Adjustments'}, {$set:{opBalance:updatedOpBalDiff}});
        }
        return Promise.resolve();    
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
}

ledgerSchema.post('save', async function(doc, next) {
    try {
        await this.constructor.updateOpeningBalanceDifference();
        next();
    } catch (error) {
        next(error);
    }
});

ledgerSchema.post('findOneAndReplace', async function(result, next) {
    try {
        await this.model.updateOpeningBalanceDifference();
        next();
    } catch (error) {
        next(error);
    }
});

ledgerSchema.post('deleteOne', async function(result, next) {
    try {
        await this.model.updateOpeningBalanceDifference();
        next();
    } catch (error) {
        next(error);
    }
});

export default ledgerSchema;
