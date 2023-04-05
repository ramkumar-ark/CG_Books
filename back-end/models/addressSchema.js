import { Schema } from "mongoose";

const addressSchema = new Schema({
    attention: {type: String},
    country:{type: String, },
    state:{type: String, },
    city: {type: String, },
    street1: {type: String},
    street2: {type: String},
    pincode: {type: Number},
    phone: {type: Number},
    fax: {type:Number},
    type: {type: String, required: true, default: "billing"}
});

export default addressSchema;
