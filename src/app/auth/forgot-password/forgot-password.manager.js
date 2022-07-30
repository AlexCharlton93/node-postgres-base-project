import nodemailer from 'nodemailer';
import { HttpError, errorTypes } from '../../../common/errors';
import { userUpdateVerificationCode } from '../../../common/services/user';
import { authErrorMessages } from '../shared';
import { forgotPasswordEmailTemplate } from '../../../common/email-templates';

export const sendPasswordResetEmail = async(request) => {
    _validateRequest(request);

    const { body: { emailAddress } } = request;
    const verificationCode = _generateVerificationCode();

    await userUpdateVerificationCode(emailAddress, verificationCode);

    const transporter = nodemailer.createTransport({
        host: process.env.APP_EMAIL_HOST,
        port: process.env.APP_EMAIL_PORT,
        secure: process.env.APP_EMAIL_SECURE,
        auth: {
            user: process.env.APP_EMAIL_USER,
            pass: process.env.APP_EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `${process.env.APP_EMAIL_USER}`,
        to: emailAddress,
        subject: 'Reset Password',
        text: `To reset your password navigate to the following url: ${process.env.APP_RESET_PASSWORD_URL} and enter the following verification code: ${verificationCode}`, // plain text body
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
