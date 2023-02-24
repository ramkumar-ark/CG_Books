import { Schema } from "mongoose";

const addressSchema = new Schema({
    attention: {type: String},
    country:{type: String, required: true},
    state:{type: String, requried: true},
    city: {type: String, required: true},
    street1: {type: String},
    street2: {type: String},
    pincode: {type: Number},
    phone: {type: Number},
    type: {type: String, required: true}
});

export default addressSchema;
