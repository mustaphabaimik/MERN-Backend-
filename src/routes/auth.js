const { json } = require('body-parser');
const express=require('express');
const { signup, signin } = require('../controller/auth');
const { loginvalidation, validation, inscriptionValidation } = require('../validation/auth');
const router = express.Router();





router.post('/signup',inscriptionValidation,validation,signup);
router.post('/signin',loginvalidation,validation,signin);










module.exports = router;