import { Schema } from "mongoose";

const ledgerSchema = new Schema({
    name:{type: String, required: true, unique: true},
    group:{type: Schema.Types.ObjectId, ref: 'Groups', required: true},
    description: {type: String, required: true},
    opBalance:{type: Number, default: Number(0)},
});

export default ledgerSchema;
