const express = require('express');
const { ajouterElemCart } = require('../controller/cart');
const { loginAuthorisation, userAuthorisation } = require('../autorisations');
const router = express.Router();


router.post('/user/cart/ajouterProduit', loginAuthorisation, userAuthorisation, ajouterElemCart);
//router.post('/user/cart/addToCartByLogin', requireSignin, userMiddleware, addToCart);
//router.post('/user/getCartItems', requireSignin, userMiddleware, getCartItems);

module.exports = router;