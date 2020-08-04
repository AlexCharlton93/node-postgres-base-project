import nodemailer from 'nodemailer';
import { HttpError, errorTypes } from '../../../common/errors';
// import { userUpdateVerificationCode } from '../../../common/services/user';
import { authErrorMessages } from '../shared';
import { config } from '../../../common/config';
import { forgotPasswordEmailTemplate } from '../../../common/email-templates';

export const sendPasswordResetEmail = async(request) => {
    _validateRequest(request);

    const { body: { emailAddress } } = request;
    const { email: { host, port, secure, user, pass }, resetPassword: { url } } = config;
    const verificationCode = _generateVerificationCode();

    // TODO: Update using Sequelize
    // await userUpdateVerificationCode(emailAddress, verificationCode);

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
            user,
            pass,
        },
    });

    const mailOptions = {
        from: `${user}`,
        to: emailAddress,
        subject: 'Reset Password',
        text: `To reset your password navigate to the following url: ${url} and enter the following verification code: ${verificationCode}`, // plain text body
        html: forgotPasswordEmailTemplate(verificationCode),
    };

    await transporter.sendMail(mailOptions);
};

const _generateVerificationCode = () => {
    let verificationCode = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i += 1) {
        verificationCode += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return verificationCode;
}

const _validateRequest = (request) => {
    if (!request.body) {
        throw new HttpError(authErrorMessages.body, authErrorMessages.body, errorTypes.INVALID_PARAMETERS);
    }

    if (!request.body.emailAddress) {
        throw new HttpError(authErrorMessages.email, authErrorMessages.email, errorTypes.INVALID_PARAMETERS);
    }

    if (typeof request.body.emailAddress !== 'string') {
        throw new HttpError(authErrorMessages.email, authErrorMessages.email, errorTypes.INVALID_PARAMETERS);
    }
}
