const User=require('../../models/user');
const jwt=require('jsonwebtoken');

exports.signup=(req,res)=>{
      //console.log(req.body.prenom);
      User.findOne({email:req.body.email})
      .exec((error,user)=>{
          if(user)
            return res.status(400).json({
               message:'admin deja exist'
            });
  
            const{
                prenom,
                nom,
                email,
                password
            }=req.body;
            const _user=new User({
                prenom,
                nom,
                email,
                password,
                nomUtilisateur:Math.random().toString(),
                role:"admin"
            });
  
            _user.save((err,data)=>{
                 if(err){
                     return res.status(400).json({
                        message:'erreur'
                     });
                 }
  
                 if(data){
                     return res.status(201).json({
                           message:"admin a ete bien cree"
                     });
                 }
            });
      });
}

exports.signin=(req,res)=>{
    //console.log(req.body.email);

    User.findOne({email:req.body.email})
    .exec((err,user)=>{
          if(err) return res.status(400).json({err});
          if(user){               
            if(user.authentification(req.body.password) && user.role=="admin"){
                const token =jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1d'});
                const {_id,prenom,nom,email,role}=user;
                res.cookie('token', token, { expiresIn: '1d' });
                res.status(200).json({
                    token,
                    user:{
                        _id,prenom,nom,email,role
                    }
                });
            }
            else{
                return res.status(400).json({
                    message:"mot de passe invalid"
                })
            }
                
          }else{
              return res.status(400).json({message:'erreur'});
          }
    });
}


exports.signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Déconnexion réussie'
    })
}

