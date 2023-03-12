import { Schema } from "mongoose";

const primaryGroupSchema = new Schema({
    name:{type: String, unique:true, required: true},
    category: {type: Schema.Types.ObjectId, ref: "AccountTypes", required: true},
    isSubGroup: {type: Boolean, required: true, default: false}
}, {collection: 'groups'});

export default primaryGroupSchema;
