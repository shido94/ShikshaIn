const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const Document = new Schema({
  Course        : String,
  University    : String,
  doc_of_college: String,
  year          : Number,
  semester      : Number,
  branch        : String,
  document      : String,
  subject       : String,
  Unit_covered  : [{type: String}],
  num_downloads  : Number,
  uploaded_at   : { type: Date, Default: Date.now() }
});

module.exports = mongoose.model('document',Document);
