import { connect } from "mongoose";
import { DB_NAME, MONGO_URL } from "../constant.js";

export const dbConnection = async () => {
    try {
        const connectionInstance = await connect(
            `${MONGO_URL}/${DB_NAME}`
        );
        console.log(
            "Mongo Connection with Host : ",
            connectionInstance.connection.host
        );
    } catch (error) {
        console.log("Mongo Connection Failed !! ", error.message);
        process.exit(1);
    }
};
