const express = require ('express') // en récupère le module express que nous avons installé graçe a (npm install express)
const app = express()// utilisation de ce module pour la création du serveur réferencer dans la VAR = app

const cors = require('cors');
app.use(cors());

app.set('views','./views'); //définir le dossier pour les views
app.set('view engine', 'ejs'); //définir ejs comme outil pour utiliser les views
app.use('/public',express.static('public')); //permet l'utilisation de fichiers statiques dans public

app.get('/friandChoix/:varrecup',(req , res)=> {

  let listeChoco = [{brand:'kit kat', price: 10.45, cie:'Cadbury'},
{brand:'Mars', price: 10.45, cie:'Hershey'},
{brand:'Coffee', price: 10.45, cie:'Laura secord'},
{brand:'Wunderbar', price: 10.45, cie:'General food'},
{brand:'Skittles', price: 10.45, cie:'Canadian Chocolat'}];

let listeChips = [{brand:'BBQ', price: 3.45,cie:'Lays'},
{brand:'Regular', price: 2.50,cie:'Lays'},
{brand:'Cheddar', price: 1.45,cie:'Doritos'},
{brand:'Salt and Vinigger', price: 10.45,cie:'Miss Vickie'},
{brand:'CreamCheese', price: 10.45,cie:'Pringles'}];
  const varrecup =req.params.varrecup; //le nom entre par le user sera récuperer et affichier a la page

if (varrecup=="chocolat"){
  res.json(listeChoco);
}
if (varrecup=="chips")
{
  res.json(listeChips);
}
else {
  //res.send();
  res.render('friandChoix', {varcliententer: varrecup});
}
});

const mongoose = require('mongoose');
const connection = mongoose.connection;

//mongoose.connect('mongodb://sjaida:sjaida@10.30.40.121:27017/dbProj',{ useUnifiedTopology: true, useNewUrlParser: true } );
mongoose.connect('mongodb://localhost:27017/dbProj',{  useUnifiedTopology:true , useNewUrlParser: true });

const bodyParser = require('body-parser');
const Friandise = require('./models/modFriandise');
const { urlencoded } = require('express');

app.use(bodyParser.json()); //Lire les objects JSON a l'aide du body-parser
app.use(bodyParser.urlencoded({extended:false})); //Lire les adresses URL envoyer par le client / lire les object arrivant par le web

app.post('/newFriandise',(req,res) => {
  console.log('req.body', req.body);
  const friandise3 = new Friandise(req.body);

  friandise3.save((err, friandise3)=> {
  if (err) {
    return res.status(500).json(err);
  }
  res.status(201).json(friandise3);
  });
  });

  app.get('/friandises', (req,res) => {
    Friandise.find()
    .exec()

    .then(friandise => res.status(200).json(friandise));

    });

    app.delete('/delfriandise/:id', (req,res)=> {
      const id = req.params.id;
      Friandise.findByIdAndDelete(id, (err, friandise)=>{

        if (err) {
          return res.status(500).json(err);
        }
        res.status(202).json ({msg : `friandise avec l id ${friandise._id} supprimee avec succes ! `});

      });

      });

app.listen (3015,()=>{ //le serveur attend les requete sur le port 3015
  console.log ("j'écoute le port 3015 !");
});

connection.once('open',()=>{
  console.log('Connected to MongoDB')
});