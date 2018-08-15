const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const Document = new Schema({
  course        : String,
  university    : String,
  doc_of_college: String,
  semester      : Number,
  branch        : String,
  document      : String,
  subject       : String,
  unit_covered  : [{type: String}],
  num_downloads : Number,
  uploadedAt    : { type : Date, default: Date.now },
});

module.exports = mongoose.model('document',Document);
