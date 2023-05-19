const app = require('../controllers/appController')
const express = require('express')
const router = express.Router();


router.route('/').get(app)

module.exports = router