const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('../config/database');


var PrescriptionSchema = mongoose.Schema({

  pid:{
    type : String,
    required : true
  },
  fullname:{
    type : String,
    required : true
  },
  age:{
    type : Number,
    required : true
  },
  created_date:{
    type : Date,
    required : true
  },
  prescribed_drugs : [{
      drug: { type: String, lowercase: true, trim: true },
      duration: { type: String, trim: true }
  }],
  physician : {

     type: mongoose.Schema.Types.ObjectId,
     ref: 'Users'

  }

});

const Prescription = module.exports = mongoose.model('Prescription', PrescriptionSchema);
module.exports.addPrescription = (newPrescription, callback) =>{
      newPrescription.save(callback);
}

module.exports.getAllPresciptions = (callback) =>{
      Prescription.find(callback);
}

module.exports.getAllPresciptionsByUsername = (_id ,callback) =>{
      let query = {physician : _id };
      Prescription.find(query,callback);
}
module.exports.getPrescriptionBy_Id = (_id, callback)=>{

  let query = { _id : _id };
  Prescription.findOne(query,callback);

}

module.exports.removePrescription = (_id,callback) => {

  Prescription.findOneAndRemove(_id,callback);

}

module.exports.updatePrescription = (updatedPrescription, callback) =>{

  updatedPrescription.save(callback);

}
