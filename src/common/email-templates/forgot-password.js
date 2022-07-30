// TODO: Update to a nicer looking HTML Template
export const forgotPasswordEmailTemplate = (verificationCode) => {
	return '<h2 style="font-size: 16px;"> Forgot Password </h2>'
		+ '<p>Click the button below to reset your password</p>'
		+ `<p>Verification code: ${verificationCode}</p>`
		+ `<a href="${process.env.APP_RESET_PASSWORD_URL}${verificationCode}">Reset Password</a>`;
}
