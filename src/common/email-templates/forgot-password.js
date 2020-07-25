import { config } from '../config';

// TODO: Update to a nicer looking HTML Template
export const forgotPasswordEmailTemplate = (verificationCode) => {
	return '<h2 style="font-size: 16px;"> Company Name </h2>'
		+ '<p>Click the button below to reset your password</p>'
		+ `<p>Verification code: ${verificationCode}</p>`
		+ `<a href="${config.resetPassword.url}${verificationCode}">Reset Password</a>`;
}
