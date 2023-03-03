import { Schema } from "mongoose";

const debitCreditSchema = new Schema({
    ledger:{type:Schema.Types.ObjectId, ref:'Ledger', required:true},
    amount:{type:Number, required:true},
}, {_id:false});

const transactionSchema = new Schema({
    voucherType:{type:Schema.Types.ObjectId, ref:'Voucher', required:true},
    transactionDate: {type:Date, required:true},
    debits:[debitCreditSchema],
    credits:[debitCreditSchema],
    narration:{type:String},
    referenceNumber:{type:String},
    referenceDate:{type:Date},
    status:{type:String, required:true, default:"active"},
    otherDetails:{type:Schema.Types.ObjectId, ref:'OtherDetails'},
    createdOn:{type:Date, required:true, default:Date.now},
    createdBy:{type:Schema.Types.ObjectId, ref:'User', required:true},
    lastModifiedOn:{type:Date},
    lastModifiedBy:{type:Schema.Types.ObjectId, ref:'User'},
});

export default transactionSchema;
