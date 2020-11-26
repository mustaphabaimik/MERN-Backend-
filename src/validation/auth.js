const { check, validationResult } = require('express-validator');


exports.inscriptionValidation = [
    check('prenom')
    .notEmpty()
    .withMessage('Indiquez votre prenom'),
    check('nom')
    .notEmpty()
    .withMessage('Indiquez votre nom'),
    check('email')
    .isEmail()
    .withMessage("S''il vous plaît entrer une adresse email valide"),
    check('password')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit avoir une longueur minimum de 5 caractères')
];


exports.loginvalidation = [
    check('email')
    .isEmail()
    .withMessage("S''il vous plaît entrer une adresse email valide"),
    check('password')
    .isLength({ min: 3 })
    .withMessage('Le mot de passe doit avoir une longueur minimum de 5 caractères.')
];

exports.validation = (req, res, next) => {
    const erreurs = validationResult(req);
    if(erreurs.array().length > 0){
        return res.status(400).json({ erreur: erreurs.array()[0].msg })
    }
    next();
}