const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
    nom: { 
        type: String, 
        required: true, 
        trim: true 
    },
    slug: { 
        type: String, 
        required: true, 
        unique: true 
    },
    type: {
        type: String
    },
    categorieImage: { type: String },
    parentId: {
        type: String
    }

}, { timestamps: true });


module.exports = mongoose.model('Categorie', categorieSchema);