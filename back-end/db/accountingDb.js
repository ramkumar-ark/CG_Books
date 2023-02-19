import mongoose from "mongoose";
import createAccountingModels from "../models/accountingModel";
import createAccountingControllers from "../controllers/accountingControllers";

const atlasPassword = process.env.atlasPassword;
const atlasUser = process.env.atlasUser;

export default async function initiateAccountingDb(orgId, isNewOrg){
    let connectionString = `mongodb+srv://${atlasUser}:${atlasPassword}@cluster0.lyka770.mongodb.net/${orgId}?retryWrites=true&w=majority`;
    const db = await mongoose.createConnection(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const databaseModels = createAccountingModels(db);
    const databaseControllers = createAccountingControllers(databaseModels);
    isNewOrg && await databaseControllers.utils.createPrimaryMasters();
    console.log("Connected to Accounting Database");
    return databaseControllers;
}
