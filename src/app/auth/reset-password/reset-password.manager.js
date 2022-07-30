import bcrypt from 'bcrypt';
import { HttpError, errorTypes } from '../../../common/errors';
import { userFindByEmail, userUpdatePassword } from '../../../common/services/user';
import { authErrorMessages } from '../shared';

export const updatePassword = async(request) => {
    _validateRequest(request);

    const { body: { emailAddress, newPassword, verificationCode } } = request;

    const user = await userFindByEmail(emailAddress);

    if (!user) {
        throw new HttpError(
            authErrorMessages.verificationMismatch,
            authErrorMessages.verificationMismatch,
            errorTypes.INVALID_PARAMETERS
        );
    }

    if (user.verificationCode !== verificationCode) {
        throw new HttpError(
            authErrorMessages.verificationMismatch,
            authErrorMessages.verificationMismatch,
            errorTypes.INVALID_PARAMETERS
        );
    }

    const encryptedPassword = bcrypt.hashSync(newPassword, 10);

    await userUpdatePassword(
        emailAddress,
        encryptedPassword
    );
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
            authErrorMessages.email,
            authErrorMessages.email,
            errorTypes.INVALID_PARAMETERS
        );
    }

    if (typeof request.body.emailAddress !== 'string') {
        throw new HttpError(
            authErrorMessages.email,
            authErrorMessages.email,
            errorTypes.INVALID_PARAMETERS
        );
    }

    if (!request.body.newPassword) {
        throw new HttpError(
            authErrorMessages.newPassword,
            authErrorMessages.newPassword,
            errorTypes.INVALID_PARAMETERS
        );
    }

    if (typeof request.body.newPassword !== 'string') {
        throw new HttpError(
            authErrorMessages.newPassword,
            authErrorMessages.newPassword,
            errorTypes.INVALID_PARAMETERS
        );
    }

    if (!request.body.newPasswordConfirm) {
        throw new HttpError(
            authErrorMessages.confirmPassword,
            authErrorMessages.confirmPassword,
            errorTypes.INVALID_PARAMETERS
        );
    }

    if (typeof request.body.newPasswordConfirm !== 'string') {
        throw new HttpError(
            authErrorMessages.confirmPassword,
            authErrorMessages.confirmPassword,
            errorTypes.INVALID_PARAMETERS
        );
    }

    if (!request.body.verificationCode) {
        throw new HttpError(
            authErrorMessages.verificationCode,
            authErrorMessages.verificationCode,
            errorTypes.INVALID_PARAMETERS
        );
    }

    if (typeof request.body.verificationCode !== 'string') {
        throw new HttpError(
            authErrorMessages.verificationCode,
            authErrorMessages.verificationCode,
            errorTypes.INVALID_PARAMETERS
        );
    }

    if (request.body.newPassword !== request.body.newPasswordConfirm) {
        throw new HttpError(
            authErrorMessages.passwordsDoNotMatch,
            authErrorMessages.passwordsDoNotMatch,
            errorTypes.INVALID_PARAMETERS
        );
    }
}
