import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HttpError, errorTypes } from "../../../common/errors";
import { authErrorMessages } from "../shared";
import { config } from "../../../common/config";
import { User } from "../../../common/services/user";

export const generateToken = async (request) => {
    _validateRequest(request);

    const {
        body: { emailAddress, password },
    } = request;

    const user = await User.findOne({
        where: {
            emailAddress,
        },
    });

    if (!user) {
        throw new HttpError(
            authErrorMessages.emailAddressPassword,
            authErrorMessages.emailAddressPassword,
            errorTypes.INVALID_OPERATION
        );
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
        throw new HttpError(
            authErrorMessages.emailAddressPassword,
            authErrorMessages.emailAddressPassword,
            errorTypes.INVALID_OPERATION
        );
    }

    const token = jwt.sign(
        { userId: user.id, userEmail: user.emailAddress },
        config.secretKey,
        {
            expiresIn: config.JwtExpiryTime,
        }
    );

    return {
        token,
    };
};

const _validateRequest = (request) => {
    if (!request.body) {
        throw new HttpError(
            authErrorMessages.body,
            authErrorMessages.body,
            errorTypes.INVALID_PARAMETERS
        );
    }

    if (!request.body.emailAddress) {
        throw new HttpError(
            authErrorMessages.emailAddressPassword,
            authErrorMessages.emailAddressPassword,
            errorTypes.INVALID_PARAMETERS
        );
    }

    if (typeof request.body.emailAddress !== "string") {
        throw new HttpError(
            authErrorMessages.emailAddressPassword,
            authErrorMessages.emailAddressPassword,
            errorTypes.INVALID_PARAMETERS
        );
    }

    if (!request.body.password) {
        throw new HttpError(
            authErrorMessages.emailAddressPassword,
            authErrorMessages.emailAddressPassword,
            errorTypes.INVALID_PARAMETERS
        );
    }

    if (typeof request.body.password !== "string") {
        throw new HttpError(
            authErrorMessages.emailAddressPassword,
            authErrorMessages.emailAddressPassword,
            errorTypes.INVALID_PARAMETERS
        );
    }
};
