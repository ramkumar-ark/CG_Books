import { Schema } from "mongoose";
import addressSchema from "./addressSchema";

const itemListSchema = new Schema({
    details:{type:String, required: true},
    quantity:{type:Number, required: true},
    rate:{type:Number, required:true},
    amount:{type:Number, required:true},
}, {_id:false});

const creditTermsSchema = new Schema({
    value: {type:Number, },
    unit: {type:String, enum:['days', 'months', 'years']},
});

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
    pendingAmount:{type:Number},
    status:{type:String}
});

export default otherDetailsSchema;
