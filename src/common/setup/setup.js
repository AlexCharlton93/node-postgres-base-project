import { Auth } from "../../app/auth";
import { User } from "../../app/user";
import { db } from "../database";

const registerControllers = (app) => {
    Auth(app);
    User(app);
};

export const setupApp = (app) => {
    registerControllers(app);

    // Test DB Connection
    db.authenticate()
        .then(() => console.log("Database connected..."))
        .catch((err) => console.log("Error: " + err));
};
