export const config = {
    database: {
        user: 'admin',
        password: 'LD46723rt15p',
        port: 5432,
        databaseName: 'api'
    },
    environment: {
        port: 3001
    },
    email: {
        host: 'mail.privateemail.com',
        port: 465,
        secure: true, // Note: true for 465, false for other ports
        user: 'email_address',
        pass: 'password'
    },
    resetPassword: {
        url: 'define_here'
    },
    secretKey: 'Lfwe67fDYxw23!',
    JwtExpiryTime: '1h'
};
