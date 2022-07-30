import {
    HttpError,
    errorTypes,
    internalMessages,
    controllerCatch,
} from "../../common/errors";
import { statusCodes } from '../../common/status-codes';
import { loginRoute, resetPasswordRoute, forgotPasswordRoute } from "../../common/routes";
import { generateToken } from "./login";
import { updatePassword } from "./reset-password";
import { sendPasswordResetEmail } from "./forgot-password";

export const AuthController = (app) => {
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
    app.post(loginRoute, authenticate());
    app.post(resetPasswordRoute, resetPassword());
    app.post(forgotPasswordRoute, forgotPassword());
}

export const authenticate = () => async (request, response) => {
    try {
        const jwt = await generateToken(request);

        response.send(jwt);
    } catch (e) {
        controllerCatch(e, request, response);
    }
};

export const resetPassword = () => async (request, response) => {
    try {
        await updatePassword(request);

        response.sendStatus(statusCodes.OK);
    } catch (e) {
        controllerCatch(e, request, response);
    }
};

export const forgotPassword = () => async (request, response) => {
    try {
        await sendPasswordResetEmail(request);

        response.sendStatus(statusCodes.OK);
    } catch (e) {
        controllerCatch(e, request, response);
    }
};
