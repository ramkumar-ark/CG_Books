import { Schema } from "mongoose";

const contactSchema = new Schema({
    salutation:{type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String },
    email: {type: String},
    workPhone: {type: Number},
    mobile: {type: Number},
});

export default contactSchema;
