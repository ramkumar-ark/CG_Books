import mongoose from "mongoose";
import createAccountingModels from "../models/accountingModel";
import createAccountingControllers from "../controllers/accountingControllers";

const atlasPassword = process.env.atlasPassword;
const atlasUser = process.env.atlasUser;
let databaseControllers = {};

export default async function initiateAccountingDb(orgId, isNewOrg){
    let connectedDB;
    try {
        let connectionString = `mongodb+srv://${atlasUser}:${atlasPassword}@cluster0.lyka770.mongodb.net/${orgId}?retryWrites=true&w=majority`;
        const db = await mongoose.createConnection(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to Accounting Database");
        connectedDB = db;
        const databaseModels = createAccountingModels(db);
        console.log('Accounting Models Created');
        databaseControllers[orgId] = createAccountingControllers(databaseModels);
        console.log('Accounting Controllers Created')
        isNewOrg && await databaseControllers[orgId].utils.createPrimaryMasters();
        isNewOrg && console.log("Accounting Masters Created");
        return Promise.resolve(databaseControllers[orgId]);    
    } catch (error) {
        console.log(error);
        try {
            (isNewOrg && connectedDB) && await connectedDB.dropDatabase(); 
            return Promise.reject(error);    
        } catch (err){
            return Promise.reject(err)
        }
    }    
}

export const getDbController = async(orgId) => {
    let dbController = databaseControllers[orgId];
    if (!dbController) dbController = await initiateAccountingDb(orgId, false);
    return dbController;
};
