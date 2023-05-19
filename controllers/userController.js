const User = require('../models/user');
const bcrypt = require('bcrypt');
const {logger} = require('../middlewares/logger');

const getAllUser = async (req,res)=>{
    const allUsers = await User.find({}).select('username roles active').lean().exec();
    res.status(200).json({allUsers})
}

const createUser = async (req,res)=>{
    const {username,password,roles} = req.body
    
    // Confirm data
    if (!username || !password) {
        const message = {message:'All fields are required !'};
        logger('info',message);
        return res.status(400).json(message);
    }
    const duplicate = await User.findOne({ username }).lean().exec()

    if(duplicate) {
        const message = {message:'Username already taken !'}
        logger('info',message);
        return  res.status(409).json(message);
    }

    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(password, salt);

    const userObject = (!Array.isArray(roles) || !roles.length)
        ? { username, "password": hash }
        : { username, "password": hash, roles }

    const user = await User.create(userObject)
    if (user) { //created 
        const message = {message:'user created successfully'};
        logger('info',message);
        return res.json(message);
    } else {
        const message = { message:'invalid user data' }
        logger('info',message);
        res.status(400).json(message);
    }
}

const updateUser = async (req,res)=>{
    const {username,active} = req.body
    const result = await User.updateOne({ username: username }, { active: active });
    logger('info',result)
    res.json({result})
}

const deletUser = async (req,res)=>{
    const {username,password} = req.body
    const result = await User.findOneAndDelete({username:username})
    const message = {message:`user  ${result.username} deleted successfully`};
    logger('info',message);
    res.json(message)
}

module.exports = {getAllUser,createUser,updateUser,deletUser}