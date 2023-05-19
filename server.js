const express = require('express');
const {port}  = require('./nodeAppConfig.json');
const {reqLogger,logger} = require('./middlewares/logger');
const dbConn = require('./config/dbConfig');
const mongoose = require('mongoose');
const app = express();

dbConn()
.catch(err => logger('error',`${err.message}`));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(reqLogger);

app.use('/auth',require('./routes/authRoute'));
app.use('/user',require('./routes/userRoute'))
app.use('/app',require('./routes/appRoute'))

mongoose.connection.once('open', () => {
    logger('info',{message:'mongodb connected'});
})
mongoose.connection.on('error', err => {
    logger('error',{message:err.message})
});

app.listen(port,() => {
    logger('info',{message:`server listening in port ${port}`});

})