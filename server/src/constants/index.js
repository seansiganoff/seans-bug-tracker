require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    SECRET: process.env.SECRET,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD
}