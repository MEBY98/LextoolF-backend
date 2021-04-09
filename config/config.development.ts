// import { operatorsAliases } from 'src/database/database.config';

export const config = {
  database: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'generic',
    logging: false,
    // operatorsAliases,
  },
  host: "http://localhost:5000",
  frontend_host: "http://localhost:8080",
  jwtPrivateKey: 'jwtPrivateKey',
  appName: "MarketCuba",
  mail: {
    user: "MarketCuba",
    host: "smtp.gmail.com",
    port: 587,   // 465 (SSL)/587 (TLS)
    secure: false,
    pass: "pass",
    email: "dalfonsogcia@gmail.com",
  },
};
