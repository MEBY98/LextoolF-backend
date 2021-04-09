export const config = {
    database: {
        dialect: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE,
        logging: false,
    },
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
    mail: {
        user: "MarketCuba",
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        pass: "ungloborojodentrodeunapecera",
        email: "dalfonsogcia@gmail.com",
    },
};

// EMAIL_ID = user@outlook.com
// EMAIL_PASS = password
// EMAIL_HOST = smtp.office365.com
// EMAIL_PORT = 587
