import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpError, errorTypes } from '../../../common/errors';
import { userFindByEmail } from '../../../common/services/user';
import { authErrorMessages } from '../shared';
import { config } from '../../../common/config';

export const generateToken = async(request) => {
    _validateRequest(request);

    const { body: { emailAddress, password } } = request;

    const user = await userFindByEmail(emailAddress);
    if (!user) {
        throw new HttpError(authErrorMessages.emailAddressPassword, authErrorMessages.emailAddressPassword, errorTypes.INVALID_OPERATION);
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
        throw new HttpError(authErrorMessages.emailAddressPassword, authErrorMessages.emailAddressPassword, errorTypes.INVALID_OPERATION);
    }

    const token = jwt.sign({ userId: user._id, userEmail: user.emailAddress }, config.secretKey, {
        expiresIn: config.JwtExpiryTime,
    });

    return {
        token,
    };
};

const _validateRequest = (request) => {
    if (!request.body) {
        throw new HttpError(authErrorMessages.body, authErrorMessages.body, errorTypes.INVALID_PARAMETERS);
    }

    if (!request.body.emailAddress) {
        throw new HttpError(authErrorMessages.emailAddressPassword, authErrorMessages.emailAddressPassword, errorTypes.INVALID_PARAMETERS);
    }

    if (typeof request.body.emailAddress !== 'string') {
        throw new HttpError(authErrorMessages.emailAddressPassword, authErrorMessages.emailAddressPassword, errorTypes.INVALID_PARAMETERS);
    }

    if (!request.body.password) {
        throw new HttpError(authErrorMessages.emailAddressPassword, authErrorMessages.emailAddressPassword, errorTypes.INVALID_PARAMETERS);
    }

    if (typeof request.body.password !== 'string') {
        throw new HttpError(authErrorMessages.emailAddressPassword, authErrorMessages.emailAddressPassword, errorTypes.INVALID_PARAMETERS);
    }
}
