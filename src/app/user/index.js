import { controllerCatch } from "../../common/errors";
import { createAccount } from "./create-user";

export const User = (app) => {
    app.post("/user", async (req, res) => {
        try {
            const user = await createAccount(req);
    
            res.send(user);
        } catch (e) {
            controllerCatch(e, req, res);
        }
    });
};
