const mainRoute = '/api/1.0';

const authRoute = `${mainRoute}/auth`;
export const loginRoute = `${authRoute}/login`;

// TODO: Need to move these to user routes instead
export const forgotPasswordRoute = `${authRoute}/forgot-password`;
export const resetPasswordRoute = `${authRoute}/reset-password`;

export const exampleRoute = `${mainRoute}/example`;
