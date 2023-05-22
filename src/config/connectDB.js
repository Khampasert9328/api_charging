const mongoose = require('mongoose');

const connectionDB = async()=>{
    try {
        await mongoose.connect('mongodb+srv://admin:admin95494979@cluster0.2llw2la.mongodb.net/ChargingDB?retryWrites=true&w=majority',{
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