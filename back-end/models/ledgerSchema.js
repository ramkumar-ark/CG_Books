import { Schema } from "mongoose";

const ledgerSchema = new Schema({
    name:{type: String, required: true, unique: true},
    group:{type: Schema.Types.ObjectId, ref: 'Groups', required: true},
    description: {type: String, required: true},
    opBalance:{type: Number, default: Number(0)},
    isReadOnly: {type: Boolean, required: true, default: false},
});

ledgerSchema.statics.updateOpeningBalanceDifference = async function(){
    try {
        const docs = await this.find({}, {opBalance:1});
        const openingBalanceDifference = docs.reduce((pv, doc) => pv + doc.opBalance,0);
        if (!!openingBalanceDifference) {
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

async function protectReadOnly(next) {
    console.log('updateOne or replaceOne middleware triggered.');
    const docToUpdate = await this.model.findOne(this.getQuery());
    if (docToUpdate.isReadOnly) {
        const updateQuery = this.getUpdate();
        const fieldsToUpdate = Object.keys(updateQuery);
        if (fieldsToUpdate.includes('opBalance')) {
            const opBalance = updateQuery['opBalance'];
            this._update = {$set: {opBalance}};
            next();
        } else {
            next(new Error('Cannot modify read only ledgers.'));
        }
    } else {
        next();
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

ledgerSchema.post('findOneAndUpdate', async function(doc, next) {
    try {
        await this.model.updateOpeningBalanceDifference();
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

ledgerSchema.pre('updateOne', protectReadOnly);
ledgerSchema.pre('findOneAndUpdate', protectReadOnly);

ledgerSchema.pre('deleteOne', async function(next) {
    try {
        const docToDelete = await this.model.findOne(this.getQuery());
        if (docToDelete.isReadOnly) next(new Error('ReadOnlyLedger'));
        else next();
    } catch (error) {
        next(error);
    }
});

ledgerSchema.pre('replaceOne', async function(next) {
    try {
        const docToDelete = await this.model.findOne(this.getQuery());
        if (docToDelete.isReadOnly) next(new Error('ReadOnlyLedger'));
        else next();
    } catch (error) {
        next(error);
    }
});

ledgerSchema.pre('deleteMany', async function(next) {
    try {
        const deleteFilter = this.getFilter();
        deleteFilter.isReadOnly = false;
        this.setQuery(deleteFilter);
        next();
    } catch (error) {
        next(error);
    }
});


export default ledgerSchema;
