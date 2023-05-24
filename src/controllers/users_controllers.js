const usersmodel = require('../models/users/users_models');
const jwt = require('jsonwebtoken');
const config = require('../config/index')
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs');
const users = require('../models/users/users_models');

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const checkemail = await usersmodel.findOne({ email: email })
        if (checkemail) {
            res.status(400).json({
                message: 'ອີເມລນີ້ມີໃນລະບົບແລ້ວ',
                data: email
            })
        }
        let users = usersmodel();
        users.name = name,
            users.email = email,
            users.password = await users.encryptPassword(password)
        await users.save()
        res.status(201).json({
            status_code: 201,
            message: 'ລົງທະບຽນສຳເລັດແລ້ວ',
            data: users
        })
    } catch (error) {

        next(error)

    }

}


exports.login = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        //check email in systems 
        const checkemail = await usersmodel.findOne({ email: email })
        if (!checkemail) {

            res.status(400).json({
                message: 'ອີເມລບໍ່ຖືກຕ້ອງ',
                data: email
            })
        }


        //ເຊັກລະຫັດຜ່ານ ກັບ ລະຫັດທີ່ຢູເຊີໃສ່ມາຕົງກັນຫຼືບໍ່
        const checkPasswordlogin = await checkemail.checkPassword(password)
        if (!checkPasswordlogin) {
            res.status(400).json({
                message: 'ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ',
                data: password
            })

        }

        const token = await jwt.sign({
            id: checkemail._id,
            role: checkemail.role
        }, config.JWT_SECRET, { expiresIn: "1 day" })

        const tokenexpires = jwt.decode(token)
        res.status(200).json({
            status_code: 200,
            message: "ລັອກອິນສຳເລັດແລ້ວ",
            access_token: token,
            expires_token: tokenexpires
        })

    } catch (error) {
        next(error)

    }
}


exports.getUsers = async (req, res, next) => {
    try {
        const { id } = req.params;
        const users = await usersmodel.findById({ _id: id })
        if (!users) {
            res.status(400).json({
                status_code: 400,
                message: "ບໍ່ມີຢູເຊີນີ້ໃນລະບົບ",
            })
        }
        res.status(200).json({
            status_code: 200,
            data: users,
        })
    } catch (error) {
        next()

    }
}

exports.getUsersAll = async (req, res, next) => {
    try {
        const datauser = await usersmodel.find()
        if (!datauser) {
            res.status(400).json({
                status_code: 400,
                message: "ບໍ່ມີຂໍ້ມູນໃນລະບົບ!!!!",
            })
        }
        res.status(200).json({
            status_code: 200,
            data: datauser,
        })
    } catch (error) {
        next()

    }
}

exports.updateUsers = async (req, res) => {

    const { email } = req.body;


    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "xaiy95494979@gmail.com",
                pass: "dwpqdgbpdxzjzqyt"
            }
        })

        transporter.verify((error, success) => {
            if (error) {
                console.log(error)

            } else {
                console.log("ready for message")
                console.log(success)
            }
        })


        const otp = `${Math.floor(10000000 + Math.random() * 90000000)}`;
        const mailOption = {
            from: email,
            to: email,
            subject: "ລະຫັດ OTP",
            html: `<p>ລະຫັດຜ່ານຂອງທ່ານແມ່ນ: <b>${otp}</b></p>`
        }

        console.log("mailOption", mailOption)

        const salt = 10;
        const hasOTP = await bcrypt.hash(otp, salt);
        const newuser = await users.findOneAndUpdate({ email: email }, { password: hasOTP })
        console.log("user", newuser)

        await transporter.sendMail(mailOption)

        res.status(200).json({
            message: "ກາລຸນາກວດສອບອີເມລຂອງທ່ານ",
            data: {
                data: newuser
            }
        })

    } catch (error) {
        console.log(error)

    }
}