const mongoose = require('mongoose');

module.exports =   dbConn = async () =>{
    await mongoose.connect('mongodb://127.0.0.1:27017/test');

}