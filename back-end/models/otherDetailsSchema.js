import { Schema } from "mongoose";
import addressSchema from "./addressSchema";

const itemListSchema = new Schema({
    details:{type:String, required: true},
    ledger:{type:Schema.Types.ObjectId, ref:'Ledger'},
    quantity:{type:Number, default:1, required: true},
    rate:{type:Number, required:true},
    amount:{type:Number, required:true},
}, {_id:false});

const creditTermsSchema = new Schema({
    value: {type:Number, },
    unit: {type:String, enum:['days', 'months', 'years']},
}, {_id:false});

const discountSchema = new Schema({
    value: {type: Number},
    unit: {type:String, enum:['absolute', 'percentage']},
});

const offsetTransaction = new Schema({
    transaction: {type:Schema.Types.ObjectId, ref:'Transaction'},
    amount:{type:Number},
}, {_id:false});

const otherDetailsSchema = new Schema({
    linkedEntity:{type:Schema.Types.ObjectId, ref:'Entity'},
    partyName:{type:String},
    shippingAddress:addressSchema,
    billingAddress:addressSchema,
    itemDetails: [itemListSchema],
    dueDate:{type:Date},
    creditTerms: creditTermsSchema,
    subject:{type:String},
    notes:{type:String},
    termsAndConditions:{type:String},
    orderNumber:{type:String},
    totalAmount:{type:Number},
    discount:discountSchema,
    pendingAmount:{type:Number},
    offSetTransactions:[offsetTransaction],
    receiptMode:{type:String},
    status:{type:String},
});

otherDetailsSchema.pre('save', function(next){
    // avoid duplicate offset amounts of same receipt transaction to invoice transaction
    if (this.offSetTransactions.length>0){
        let isDuplicateFound = false;
        const offsetData = this.offSetTransactions.slice(0,this.offSetTransactions.length-1)
            .map(e => {
                if (e.transaction === this.offSetTransactions.at(-1).transaction){
                    isDuplicateFound = true;
                    return {...e, amount:this.offSetTransactions.at(-1).amount};         
                }else{ return e;}
            })
        if (isDuplicateFound) this.offSetTransactions = offsetData;
    }
    // calculate pendingAmount value
    if (this.offSetTransactions){
        const totalOffsetAmount = this.offSetTransactions.reduce((pv, e)=> e.amount + pv, 0);
        this.pendingAmount = this.totalAmount - totalOffsetAmount;
    }else{
        this.pendingAmount = this.totalAmount;
    }
    next();
});

otherDetailsSchema.post('findOneAndUpdate', async function(doc){
    const updateQuery = this.getUpdate();
    const updatedDoc = await this.model.findOne(this.getQuery());
    const newUpdateQuery = {};
    if (updateQuery['$push']) {
         // avoid duplicate offset amounts of same receipt transaction to invoice transaction
         if (updatedDoc.offSetTransactions.length>1){
            let isDuplicateFound = false;
            const offsetData = updatedDoc.offSetTransactions.slice(0,updatedDoc.offSetTransactions.length-1)
                .filter(e => {
                    if ((e.transaction && e.transaction.toString()) === updatedDoc.offSetTransactions.at(-1).transaction.toString()){
                        isDuplicateFound = true;
                        return false;      
                    }else{ return true;}
                });
            if (isDuplicateFound){ 
                offsetData.push(updatedDoc.offSetTransactions.at(-1))
                newUpdateQuery.offSetTransactions = [...offsetData];
            }
        }
    }
    // calculate pendingAmount value
    if (newUpdateQuery.offSetTransactions || updatedDoc.offSetTransactions){
        const totalOffsetAmount = (newUpdateQuery.offSetTransactions || updatedDoc.offSetTransactions)
            .reduce((pv, e)=> e.amount + pv, 0);
        newUpdateQuery.pendingAmount = updatedDoc.totalAmount - totalOffsetAmount;
    }else{
        newUpdateQuery.pendingAmount = updatedDoc.totalAmount;
    }
    // update payment status of invoice.
    if (updatedDoc.status){
        if (newUpdateQuery.pendingAmount == 0) newUpdateQuery.status = 'paid';
        else newUpdateQuery.status = 'unPaid'; 
    }
    
    // save document
    let savedDoc;
    if (updateQuery['$set']) savedDoc = await updatedDoc.update(newUpdateQuery)
    else savedDoc = await this.model.findByIdAndUpdate(updatedDoc['_id'].toString(), newUpdateQuery, {new:true});
    console.log('savedDoc', savedDoc);
});

export default otherDetailsSchema;
