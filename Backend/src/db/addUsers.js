import { PORT, SERVER_URL } from "../constant.js";
import User from "../models/Users/User.Model.js";
import { dbConnection } from "./dbConnection.js";

dbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Started on http://${SERVER_URL}:${PORT}`);
        });
    })
    .catch((err) => {
        console.log(`Error Occurred while connecting to Database : ${err}`);
    });


    const createAdminUser = async () => {
        try {
            const user = await User.create({
                username: "Aizaz Ul Haq",
                email: "admin@xyz.com",
                password: "superSecret",
                role: "ADMIN",
                isVerified: true,
            });
            console.log("Admin creation process completed", user);
        } catch (error) {
            console.log(error.message);
        }
    };
    
    createAdminUser();
