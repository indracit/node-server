const express = require('express')
const router = express.Router();
const {getAllUser,createUser,updateUser,deletUser} = require('../controllers/userController')

router.route('/')
        .get(getAllUser)
        .post(createUser)
        .patch(updateUser)
        .delete(deletUser);

module.exports = router;
