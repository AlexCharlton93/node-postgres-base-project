import {
    HttpError,
    errorTypes,
    internalMessages,
    controllerCatch,
} from "../../common/errors";
import { userRoute } from "../../common/routes";
import { createAccount } from "./create-user";

export const UserController = (app) => {
    if (!app) {
        throw new HttpError(
            null,
            internalMessages.appNotDefined,
            errorTypes.INVALID_DEPENDENCIES
        );
    }

    registerRoutes(app);
};

const registerRoutes = (app) => {
    app.post(userRoute, createUserController());
}

export const createUserController = () => async (request, response) => {
    try {
        const user = await createAccount(request);

        response.send(user);
    } catch (e) {
        controllerCatch(e, request, response);
    }
};
