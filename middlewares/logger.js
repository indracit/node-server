const { format } = require('date-fns');
const { v4: uuidv4 } = require('uuid');
const winston = require('winston');

const dateTime = format(new Date() , 'yyyy-MM-dd HH:mm:ss');
    

const winLogger = winston.createLogger({
    transports: [
        new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: winston.format.combine(winston.format.prettyPrint(),winston.format.json())
}),
        new winston.transports.File({
        filename: 'logs/info.log',
        level: 'info',
        format:winston.format.combine(winston.format.prettyPrint(),winston.format.json())
        }),
        new  winston.transports.Console({
            format : winston.format.combine(winston.format.prettyPrint())
        })

    ]
})


const logger = ( level,message) => {

    const logItem = {dateTime, uuid:uuidv4(), ...message};

    try {
        winLogger.log({level : level , logItem});
    }
    catch (err) {
        console.log(err);
    }
}

const reqLogger = (req,res,next) => {
    try {
    winLogger.log({level : 'info' , message: {dateTime, reqMethod:req.method ,  reqUrl:req.url, reqBody:req.body, reqHeaderOrigin:req.headers.origin}});
    next(); }

    catch(err){
        logger('error',`${err.message}`)
    }

}

module.exports = { logger, reqLogger}

