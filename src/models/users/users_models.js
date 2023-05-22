const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const schemaUsers = mongoose.Schema;

const usersmodel = new schemaUsers({
    name: { type: String, require: true, trim: true, },
    email: { type: String, require: true, trim: true, unique: true, index: true, },
    password: { type: String, require: true, trim: true, minlength: 3, },
    role: { type: String, default: 'member', }
}, {
    collection: 'users',
    timestamps: true
});

//ສຳລັບ register
usersmodel.methods.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(5)
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}

//ປຽບທຽບລະຫັດຜ່ານທີ່ມີໃນລະບົບເພື່ອເອົາໄປ login
usersmodel.methods.checkPassword = async function (password) {
    const isvalidate = await bcrypt.compare(password, this.password);
    return isvalidate;
}

const users = mongoose.model("Users", usersmodel)

module.exports = users