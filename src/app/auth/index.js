import { controllerCatch } from "../../common/errors";
import { statusCodes } from '../../common/status-codes';
import { generateToken } from "./login";
import { updatePassword } from "./reset-password";
import { sendPasswordResetEmail } from "./forgot-password";

export const Auth = (app) => {
    app.post("/auth/login", async (req, res) => {
        try {
            const jwt = await generateToken(req);
    
            res.send(jwt);
        } catch (error) {
            controllerCatch(error, req, res);
        }
    });

    app.post("/auth/reset-password", async (req, res) => {
        try {
            await updatePassword(req);
    
            res.sendStatus(statusCodes.OK);
        } catch (error) {
            controllerCatch(error, req, res);
        }
    });
    
    app.post("/auth/reset-password", async (req, res) => {
        try {
            await sendPasswordResetEmail(req);
    
            res.sendStatus(statusCodes.OK);
        } catch (error) {
            controllerCatch(error, req, res);
        }
    });
};
