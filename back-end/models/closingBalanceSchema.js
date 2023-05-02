import { Schema } from 'mongoose';

const closingBalanceSchema = new Schema({
    ledger:{type: Schema.Types.ObjectId, ref: "Ledger", required:true},
    balance:{type: Number, default: 0, required: true},
});

export default closingBalanceSchema;
