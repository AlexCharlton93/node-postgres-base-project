import { User } from "./";

export const userRegister = async (emailAddress, password) => {
    return await User.create({ emailAddress, password });
};

export const userFindByEmail = async (emailAddress) => {
    return await User.findOne({
        where: {
            emailAddress,
        },
    });
};

export const userUpdatePassword = async (emailAddress, password) => {
    return await User.update(
        { emailAddress, password },
        {
            where: {
                emailAddress,
            },
        }
    );
};

export const userUpdateVerificationCode = async (
    emailAddress,
    verificationCode
) => {
    return await User.update(
        { verificationCode },
        {
            where: {
                emailAddress,
            },
        }
    );
};
