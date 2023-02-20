import { Schema } from "mongoose";

const primaryGroupSchema = new Schema({
    name:{type: String, unique:true, required: true},
    category: {type: Schema.Types.ObjectId, ref: "AccountType", required: true},
    isSubGroup: {type: Boolean, required: true, default: false}
}, {collection: 'groups'});

export default primaryGroupSchema;
