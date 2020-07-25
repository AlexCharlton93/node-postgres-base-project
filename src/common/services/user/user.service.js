import { Model } from './user.model';

export const userFindByEmail = async(emailAddress) => {
    return Model.findOne({ emailAddress }); 
}

export const userRegister = async(emailAddress, password) => {
    const user = new Model({
        emailAddress,
        password
    });

    return user.save();
}

export const userUpdatePassword = async(emailAddress, password) => {
    return Model.findOneAndUpdate(
        { emailAddress },
        { password },
    );
}

export const userUpdateVerificationCode = async(emailAddress, verificationCode) => {
    return Model.findOneAndUpdate(
        { emailAddress },
        { verificationCode },
    );
}
