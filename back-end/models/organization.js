import { Schema, model } from "mongoose";

const addressSchema = new Schema({
    addressLine1:{type:String},
    addressLine2:{type:String},
    city:{type:String},
    pinCode:{type:Number},
    state:{type:String},
    country:{type:String, default:String("India")},
    activeFrom:{type:Date, default:Date.now},
    activeTo:{type:Date},
    addedBy: {type:Schema.Types.ObjectId, ref:"User"},
    removedBy:{type:Schema.Types.ObjectId, ref:"User"},
    type:{type:String, required:true, default:String("Head Office")}
});

const organizationSchema = new Schema({
    name:{type:String, required:true},
    isGstApplicable: {type:Boolean, required:true},
    gstin:{type:String},
    pan:{type:String},
    assesseeType:{type:String},
    createdOn:{type:Date, default:Date.now},
    users:[{type:Schema.Types.ObjectId, ref:"User"}],
    lastAccessed:{type:Date},
    address:{
        principlePlace:[addressSchema],
        additionalPlace:[addressSchema],
        workSite:[addressSchema],
        godown:[addressSchema],
        shop:[addressSchema],
    }
});

async function preventDuplicate(next) {
    try {
        const userId = this.users[0].toString();
        const model = this.constructor;
        const orgWithSameName = await model.find({name:this.name, users:{$in: [userId]}});
        if (orgWithSameName.length > 0) next(new Error('Organization with same name already created by you.'));
        else next();
    } catch (error) {
        next(error);
    }
};

organizationSchema.pre('save', preventDuplicate);

const Organization = model("Organization", organizationSchema);

export default Organization;
