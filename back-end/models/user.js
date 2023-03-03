import {Schema, model} from "mongoose";
import bcrypt from "bcrypt";

const organizationsSchema = new Schema({
    orgId: {type: Schema.Types.ObjectId, ref:'Organization', unique:true},
    role:{type:String, default:String("admin")},
}, {_id:false});

const userScheme = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    mobileNo:{type:String, required:true},
    organizations: [organizationsSchema],
    defaultOrganization: {type: Schema.Types.ObjectId, default: null},
    lastSelectedOrg: {type: Schema.Types.ObjectId, ref: 'Organization', default: null},
    createdAt:{type:Date, default:Date.now},
    lastLoggedIn:{type:Date, default:Date.now},
});

userScheme.pre("save", function(next){
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

userScheme.methods.checkPassword = async function(password) {
    try {
        const match = await bcrypt.compare(password, this.password);
        if (match) return Promise.resolve();
        return Promise.reject("Incorrect Password!");
    } catch (err) {
        Promise.reject(err);
    }
}

userScheme.methods.updateLastLoggedIn = function() {
    return this.model("User").findOneAndUpdate(
        {
            email: this.email,
        },
        {
            lastLoggedIn: new Date()
        }
    );
};

const User = model("User", userScheme);

export default User;
