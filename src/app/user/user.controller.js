import {
    HttpError,
    errorTypes,
    internalMessages,
    controllerCatch,
} from "../../common/errors";
import { createAccount } from "./create-user";

export const UserController = (app) => {
    if (!app) {
        throw new HttpError(
            null,
            internalMessages.appNotDefined,
            errorTypes.INVALID_DEPENDENCIES
        );
    }

    app.post("/user", async (req, res) => {
        try {
            const user = await createAccount(req);
    
            res.send(user);
        } catch (e) {
            controllerCatch(e, req, res);
        }
    });
};
