const mongoose=require('mongoose');
const bcrypt=require('bcrypt');



const userSchema=new mongoose.Schema({
    prenom:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
    nom:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
    nomUtilisateur:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    hashPass:{
        type:String
        //required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    tel:{
        type:String
    },
    image:{
        type:String
    }

},{timestamps:true});

//const hash = bcrypt.hashSync(myPlaintextPassword, salt);
//syntaxe general pour crypter un mot de passe
userSchema.virtual('password')
.set(function(password){
   this.hashPass=bcrypt.hashSync(password, 10);
   
});

  //syntaxe
       //bcrypt.compareSync(myPlaintextPassword, hash);
       //cette fonction retourne true ou false
userSchema.methods={
   authentification:function(password){
       console.log('hier we go');
       console.log(bcrypt.compareSync(password,this.hashPass))
       return bcrypt.compareSync(password,this.hashPass);    
   }
}


module.exports=mongoose.model('User',userSchema);