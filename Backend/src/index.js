import app from "./app.js";
import { PORT, SERVER_URL } from "./constant.js";
import { dbConnection } from "./db/dbConnection.js";
import dotenv from "dotenv";

dotenv.config({
    path: "../.env",
});

dbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Started on http://${SERVER_URL}:${PORT}`);
        });
    })
    .catch((err) => {
        console.log(`Error Occurred while connecting to Database : ${err}`);
    });
