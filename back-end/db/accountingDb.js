import mongoose from "mongoose";

const atlasPassword = process.env.atlasPassword;
const atlasUser = process.env.atlasUser;

export default function (orgId){
    let connectionString = `mongodb+srv://${atlasUser}:${atlasPassword}@cluster0.lyka770.mongodb.net/${orgId}?retryWrites=true&w=majority`;
    const db = mongoose.createConnection(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    return db;
}
