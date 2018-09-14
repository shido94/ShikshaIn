const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const Document = new Schema({
  uploadedBy    : String,
  types         : {type: String, trim : true},
  course        : {type: String, trim : true},
  university    : {type: String, trim : true},
  doc_of_college: {type: String, trim : true},
  semester      : {type: String, trim : true},
  branch        : {type: String, trim : true},
  document      : {type: String, trim : true},
  subject       : {type: String, trim : true},
  unit_covered  : [{type: String, trim : true}],
  num_downloads : {type: Number, trim : true},
  uploadedAt    : { type : Date, default: Date.now },
});

module.exports = mongoose.model('document',Document);
