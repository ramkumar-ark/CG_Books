import { Schema } from "mongoose";

const typeSchema = new Schema({
    name:{type: String, required: true, unique: true},
});

export default typeSchema;