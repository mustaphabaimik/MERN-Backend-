const express=require('express');
const app=express();
const env=require('dotenv');
//const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const path = require('path');
const cors = require('cors');

env.config();
app.use(express.json());
app.use(cors());

//mongodb cnx 
//mongodb+srv://root:<password>@cluster0.ngby5.mongodb.net/<dbname>?retryWrites=true&w=majority

/*mongoose.connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.ngby5.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,  
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(()=>{
    console.log('base de données connecté');
});
*/
mongoose.connect('mongodb://localhost/mernecommercedb',{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log('base de données connecté');
});

app.listen(process.env.PORT,()=>{
   console.log(`serveur écoute sur le port ${process.env.PORT}`);
});

//routes
const authRoutes=require('./routes/auth');
const adminRoutes=require('./routes/admin/auth');
const categorieRoutes=require('./routes/categorie');
const produitRoutes =require('./routes/produit');
const cartRoutes =require('./routes/cart');

app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categorieRoutes);
app.use('/api',produitRoutes);
app.use('/api',cartRoutes);