require('dotenv').config().parsed

module.exports ={
    JWT_SECRET: process.env.JWT_SECRET,
    MAIL_SERVER:process.env.MAIL_SERVER,
    PASSWORD_KEY:process.env.PASSWORD_KEY,
    MONGOOSE_URL:process.env.MONGOOSE_URL
}