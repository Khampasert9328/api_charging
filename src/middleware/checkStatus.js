module.exports.checkStatus = async (req, res, next) => {
    try {
        const { role } = req.user
        if (role == 'superadmin') {
            next()
        } else if (role == 'admin') {
            next()
        } else {
            return res.status(403).json({
                message: "ບໍ່ມີສິດເຂົ້າໃຊ້ລະບົບ ກາລຸນາກວດສອບສິດຂອງທ່ານ"
            })
        }
    } catch (error) {

    }
}