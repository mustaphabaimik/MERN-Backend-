const { json } = require('body-parser');
const express=require('express');
const { requireSignin } = require('../../autorisations');
const { signup, signin, signout } = require('../../controller/admin/auth');
const { loginvalidation, validation } = require('../../validation/auth');
const router = express.Router();




router.post('/admin/signup',signup);
router.post('/admin/signin',loginvalidation,validation,signin);
router.post('/admin/signout',requireSignin,signout);


module.exports = router;