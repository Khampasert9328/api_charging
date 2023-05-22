const usersmodel = require('../models/users/users_models');
const jwt = require('jsonwebtoken');
const config = require('../config/index')

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
    try {
        const { id } = req.params
        const { name, email, password } = req.body;
        const data = await usersmodel.findByIdAndUpdate({_id:id},{
            name:name,
            email:email,
            password:password
        })

        if (!data) {
            res.status(400).json({
                message:"ບໍ່ສາມາດອັບເດດຂໍ້ມູນໄດ້"
            })
        }
        res.status(200).json({
            message:"ອັບເດດຂໍ້ມູນສຳເລັດແລ້ວ"
        })


        


    } catch (error) {
    console.log(error)

    }
}