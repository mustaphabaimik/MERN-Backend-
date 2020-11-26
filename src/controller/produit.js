const Produit = require('../models/produit');
//const shortid = require('shortid');
const slugify = require('slugify');
const Categorie = require('../models/categorie');

exports.ajouterProduit = (req, res) => {

    //res.status(200).json( { file: req.files, body: req.body } );

    const {
        nom, prix, description, categorie, quantity, creePar
    } = req.body;
    let produitImages = [];

    if(req.files.length > 0){
        produitImages = req.files.map(file => {
            return { img: file.filename }
        });
    }

    const produit = new Produit({
        nom: nom,
        slug: slugify(nom),
        prix,
        quantity,
        description,
        produitImages,
        categorie,
        creePar: req.user._id
    });

    produit.save(((error, produit) => {
        if(error) return res.status(400).json({ error });
        if(produit){
            res.status(201).json({ produit });
        }
    }));


};

exports.ProduitsParSlug = (req, res) => {
    const { slug } = req.params;
    Categorie.findOne({ slug: slug })
    .select('_id')
    .exec((error, categorie) => {
        if(error){
            return res.status(400).json({error});
        }

        if(categorie){
            Produit.find({ categorie: categorie._id })
            .exec((error, produits) => {

                if(error){
                    return res.status(400).json({error});
                }

                if(produits.length > 0){
                    res.status(200).json({
                        produits,
                        produitsParPrix: {
                            under5k: produits.filter(produit => produit.prix <= 5000),
                            under10k: produits.filter(produit => produit.prix > 5000 && produit.prix <= 10000),
                            under15k: produits.filter(produit => produit.prix > 10000 && produit.prix <= 15000),
                            under20k: produits.filter(produit => produit.prix > 15000 && produit.prix <= 20000),
                            under30k: produits.filter(produit => produit.prix > 20000 && produit.prix <= 30000),
                        }
                    });
                }

                
            })
        }
        

        
    });
}

exports.ProduitDetailsParId = (req, res) => {
    const { produitId } = req.params;
    if(produitId){
        Produit.findOne({ _id: produitId })
        .exec((error, produit) => {
            if(error) return res.status(400).json({ error });
            if(produit){
                res.status(200).json({ produit });
            }
        });
    }else{
        return res.status(400).json({ error: 'Params required' });
    }
}
