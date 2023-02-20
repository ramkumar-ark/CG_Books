import { Schema } from "mongoose";

const groupSchema = new Schema({
    name:{type: String, unique:true, required: true},
    category:{type: Schema.Types.ObjectId, ref: "PrimaryGroups", required: true },
    isSubGroup: {type: Boolean, required: true, default: true}
}, {collection: 'groups'});

export default groupSchema;
