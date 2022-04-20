const mongoose = require('mongoose'); //Mongoose Model

const friandisesSchema = new mongoose.Schema({
  title:String,
  category:String,
  price: String,
  cie: String


});

module.exports = mongoose.model('friandise', friandisesSchema);