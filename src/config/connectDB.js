const mongoose = require('mongoose');

const connectionDB = async(req, res)=>{
    try {
        await mongoose.connect(process.env.MONGOOSDE_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('connect success')
    } catch (error) {
        console.log(error)
        process.exit(1)
        
    }
}

module.exports = connectionDB;