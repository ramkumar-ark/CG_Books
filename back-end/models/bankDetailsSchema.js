import { Schema } from "mongoose";

const bankDetailsSchema = new Schema({
    beneficiaryName: {type: String },
    bankName: {type: String, required: true },
    accountNo: {type: String, required: true},
    ifsc: {type: String, required: true},
});

export default bankDetailsSchema;
