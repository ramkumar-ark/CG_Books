import mongoose from "mongoose";

const atlasPassword = process.env.atlasPassword;
const atlasUser = process.env.atlasUser;
let connectionString = `mongodb+srv://${atlasUser}:${atlasPassword}@cluster0.lyka770.mongodb.net/cgBooks?retryWrites=true&w=majority`;

const connectToDb = () => mongoose.connect(
    connectionString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

export default connectToDb;
