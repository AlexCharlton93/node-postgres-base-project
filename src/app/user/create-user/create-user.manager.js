import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpError, errorTypes } from '../../../common/errors';
import { userFindByEmail, userRegister } from '../../../common/services/user';
import { userErrorMessages } from '../shared';

export const createAccount = async(request) => {
    _validateRequest(request);

    const { body: { name, emailAddress, password, confirmPassword } } = request;

    // eslint-disable-next-line security/detect-possible-timing-attacks
    if (password !== confirmPassword) {
        throw new HttpError(userErrorMessages.passwordsDoNotMatch, userErrorMessages.passwordsDoNotMatch, errorTypes.INVALID_PARAMETERS);
    }

    await _checkIfAlreadyRegistered(emailAddress);

    const encryptedPassword = bcrypt.hashSync(password, 10);

    const user = await userRegister(emailAddress, encryptedPassword);

    if (!user) {
        throw new HttpError(userErrorMessages.unableToRegister, userErrorMessages.unableToRegister, errorTypes.INVALID_OPERATION);
    }

    const token = jwt.sign({ userId: user._id, userEmail: user.emailAddress }, process.env.APP_JWT_SECRET_KEY, {
        expiresIn: process.env.APP_JWT_EXPIRY_TIME,
    });

    // TODO: Send Registered/Welcome Email

    return {
        token,
    };
};

const _checkIfAlreadyRegistered = async(emailAddress) => {
    const user = await userFindByEmail(emailAddress);

    if (user) {
        throw new HttpError(userErrorMessages.alreadyRegistered, userErrorMessages.alreadyRegistered, errorTypes.INVALID_OPERATION);
    }
}

const _validateRequest = (request) => {
    if (!request.body) {
        throw new HttpError(userErrorMessages.body, userErrorMessages.body, errorTypes.INVALID_PARAMETERS);
    }

    if (!request.body.emailAddress) {
        throw new HttpError(userErrorMessages.emailAddressPassword, userErrorMessages.emailAddressPassword, errorTypes.INVALID_PARAMETERS);
    }

    if (typeof request.body.emailAddress !== 'string') {
        throw new HttpError(userErrorMessages.emailAddressPassword, userErrorMessages.emailAddressPassword, errorTypes.INVALID_PARAMETERS);
    }

    if (!request.body.password) {
        throw new HttpError(userErrorMessages.emailAddressPassword, userErrorMessages.emailAddressPassword, errorTypes.INVALID_PARAMETERS);
    }

    if (typeof request.body.password !== 'string') {
        throw new HttpError(userErrorMessages.emailAddressPassword, userErrorMessages.emailAddressPassword, errorTypes.INVALID_PARAMETERS);
    }

    if (!request.body.confirmPassword) {
        throw new HttpError(userErrorMessages.confirmPassword, userErrorMessages.confirmPassword, errorTypes.INVALID_PARAMETERS);
    }

    if (typeof request.body.confirmPassword !== 'string') {
        throw new HttpError(userErrorMessages.confirmPassword, userErrorMessages.confirmPassword, errorTypes.INVALID_PARAMETERS);
    }
}
