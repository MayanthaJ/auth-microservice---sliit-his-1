const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('../config/database');

var DrugSchema = mongoose.Schema({

  id : {
    type : String,
    required : true

  },
  dname : {
    type : String,
    required : true

  },
  type : {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Categories',
     required : true

  },
  added_date : {
    type : Date,
    required : true
  },
  image : {
    type : String,
    required : true
  }

});

const Drug = module.exports = mongoose.model('Drug', DrugSchema);

module.exports.addDrug = (newDrug,callback) => {
  newDrug.save(callback);
}

module.exports.updateDrug = (updatedDrug,callback) => {

  updatedDrug.save(callback);

}
module.exports.getDrugById = (id, callback)=>{

  let query = { _id : id };
  Drug.findById(query,callback);

}

module.exports.getDrugsByName = (name, callback)=>{

  let query = { name : name };
  Drug.find(query,callback);
}

module.exports.getDrugsByDID = (did, callback)=>{

  let query = { id : did };
  Drug.findOne(query,callback);
}


module.exports.getAllDrugs = (callback) => {

  Drug.find(callback);

}

module.exports.removeDrug = (_id,callback) => {

  Drug.findByIdAndRemove(new mongoose.mongo.ObjectID(_id),callback);

}

module.exports.getAllDrugsByCategory_Id = (_id ,callback) =>{
      let query = {type : _id };
      Drug.find(query,callback);
}

module.exports.drugsSearch = (searchString,callback) =>{

  Drug.find({$or : [{id: new RegExp(searchString, 'i')},{name: new RegExp(searchString, 'i')}]},callback);

}