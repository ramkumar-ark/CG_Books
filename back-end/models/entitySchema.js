import { Schema } from "mongoose";

const creditPeriodSchema = new Schema({
    value: {type: Number, required: true, default: Number(0)},
    unit: {type: String, required: true, default: "days"},
}, {_id:false});

const entitySchema = new Schema({
    name: {type: String, required: true},
    companyName: {type: String },
    website: {type: String},
    pan: {type: String},
    creditPeriod: creditPeriodSchema,
    addresses: [{type: Schema.Types.ObjectId, ref: 'Address'}],
    contacts: [{type: Schema.Types.ObjectId, ref: 'Contact'}],
    primaryContact: {type: Schema.Types.ObjectId, ref: 'Contact'},
    bankDetails: {type: Schema.Types.ObjectId, ref: 'BankDetails'},
    isActive: {type: Boolean, required: true, default: true},
    type: {type: String, required: true },
    customerType: {type:String},
    remarks: { type: String },
    ledger: {type: Schema.Types.ObjectId, required: true, ref: 'Ledger'},
    createdOn: {type: Date, required: true, default: Date.now},
    lastUpdatedOn: {type: Date},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    updatedBy: {type: Schema.Types.ObjectId, ref: 'User', required: true},
});

export default entitySchema;
