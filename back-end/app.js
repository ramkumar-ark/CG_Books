import express from "express";
import {join} from "path";
import morgan from "morgan";
import {createStream} from "rotating-file-stream";
import dotenv from "dotenv";
import cors from "cors";
import connectToDb from "./db";
import api from "./routes/api/index";

const app = express();
dotenv.config();

// enabling cors
app.use(cors());
// Serving static assets
app.use("/assets", express.static(join(__dirname, "public")));
// Parsing the requests
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// Logging
const stream = createStream("file.log",
    {
        size:"10M", interval: "1d", compress:"gzip"
    }
);
app.use(morgan("dev", {stream}));

// Handling api routes
app.use("/api", api);

Promise.all([connectToDb()])
    .then(() => app.listen(3001, () => console.log("The Express app is listening at port 3001")))
    .catch((reason) => {
        console.log(`MongoDB Atlas Error: ${reason}`);
        process.exit();
    });
