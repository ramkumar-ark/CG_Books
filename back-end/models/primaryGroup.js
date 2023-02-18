import { Schema } from "mongoose";

const primaryGroupSchema = new Schema({
    name:{type: String, unique:true, required: true},
    accountType: {type: Schema.Types.ObjectId, ref: "AccountType", required: true},
});

export default primaryGroupSchema;
