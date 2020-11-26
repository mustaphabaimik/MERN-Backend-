const Categorie = require('../models/categorie');
const slugify = require('slugify');
const shortid = require('shortid');


function reponseCategories(categories, parentId = null){

    const categorieList = [];
    let categorie;
    if(parentId == null){
        categorie = categories.filter(cat => cat.parentId == undefined);
    }else{
        categorie = categories.filter(cat => cat.parentId == parentId);
    }

    for(let cat of categorie){
        categorieList.push({
            _id: cat._id,
            name: cat.nom,
            slug: cat.slug,
            parentId: cat.parentId,
            type: cat.type,
            sousCat: reponseCategories(categories, cat._id)
        });
    }

    return categorieList;

};


exports.ajouterCategorie = (req, res) => {

    const categorieObj = {
        nom: req.body.nom,
       // slug:req.body.nom
        slug: `${slugify(req.body.nom)}-${shortid.generate()}`
    }

    if(req.file){
        categorieObj.categorieImage = process.env.URL + '/public/' + req.file.filename;
    }

    if(req.body.parentId){
        categorieObj.parentId = req.body.parentId;
    }

    const cat = new Categorie(categorieObj);
    cat.save((error, categorie) => {
        if(error) return res.status(400).json({ error });
        if(categorie){
            return res.status(201).json({ categorie });
        }
    });


    
}


exports.Categories = (req, res) => {
    Categorie.find({})
    .exec((error, categories) => {
        if(error) return res.status(400).json({ error });
        if(categories){
            const categorieList = reponseCategories(categories);
            res.status(200).json({ categorieList });
        }
    });
}