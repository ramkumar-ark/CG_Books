import mongoose from "mongoose";
import createAccountingModels from "../models/accountingModel";
import createAccountingControllers from "../controllers/accountingControllers";

const atlasPassword = process.env.atlasPassword;
const atlasUser = process.env.atlasUser;
let databaseControllers = {};

export default async function initiateAccountingDb(orgId, isNewOrg){
    let connectionString = `mongodb+srv://${atlasUser}:${atlasPassword}@cluster0.lyka770.mongodb.net/${orgId}?retryWrites=true&w=majority`;
    const db = await mongoose.createConnection(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to Accounting Database");
    const databaseModels = createAccountingModels(db);
    console.log('Accounting Models Created')
    databaseControllers[orgId] = createAccountingControllers(databaseModels);
    console.log('Accounting Controllers Created')
    isNewOrg && await databaseControllers.utils.createPrimaryMasters();
    isNewOrg && console.log("Accounting Masters Created");
    return databaseControllers[orgId];
}

export const getDbController = async(orgId) => {
    let dbController = databaseControllers[orgId];
    if (!dbController) dbController = await initiateAccountingDb(orgId, false);
    return dbController;
};
