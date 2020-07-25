import {
    HttpError,
    errorTypes,
    internalMessages,
    controllerCatch,
} from "../../common/errors";
import { statusCodes } from '../../common/status-codes';
import { exampleRoute } from "../../common/routes";
import { exampleManager } from "./";
import { verifyToken } from "../../common/middleware";

export const ExampleController = (app) => {
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
    app.get(exampleRoute, verifyToken, exampleController());
}

export const exampleController = () => async (request, response) => {
    try {
        await exampleManager(request);

        response.sendStatus(statusCodes.OK);
    } catch (e) {
        controllerCatch(e, request, response);
    }
};
