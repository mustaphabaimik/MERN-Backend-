const express = require('express');
const { loginAuthorisation, adminAuthorisation } = require('../autorisations');
const { ajouterCategorie, Categories } = require('../controller/categorie');
const router = express.Router();

const shortid = require('shortid');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
});

const upload = multer({ storage });



router.post('/categorie/ajouter', loginAuthorisation,adminAuthorisation,upload.single('categorieImage'),ajouterCategorie);
router.get('/categorie/categories', Categories);

module.exports = router;