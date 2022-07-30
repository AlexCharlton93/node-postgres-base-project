export const regex = {
    /* Match 0-9 and A-F only, 8 chars - 4 chars - 4 chars - 4 chars - 12 chars */
    uuidv4: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
    /* Numbers, letters and spaces */
    alphaNumericSpace: /^[a-z\d\-_\s]+$/i,
    /* Only Numeric between 0 and 9 */
    numeric: /^[0-9]+$/,
    user: {
        // TODO: For now we are keeping this rule pretty open as it's hard to validate an email address
        emailAddress: /\S+@\S+\.\S+/,
        role: /^[0-2]{1}$/,
        /*  Match only a-z characters in any case, 0-9, and limiting the other characters */
        /* And between 0 and 65 characters in length */
        verificationCode: /^[a-zA-Z0-9\s,'-.]{0,65}$/
    },
};
