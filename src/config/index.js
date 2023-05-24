require('dotenv').config()

module.exports ={
    JWT_SECRET: process.env.JWT_SECRET,
    MAIL_SERVER:process.env.MAIL_SERVER,
    PASSWORD_KEY:process.env.PASSWORD_KEY
}