const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const WaitForApproval = new Schema({
  uploadedBy    : String,
  types         : String,
  course        : String,
  university    : String,
  doc_of_college: String,
  semester      : String,
  branch        : String,
  document      : String,
  subject       : String,
  unit_covered  : [{type: String}],
  uploadedAt    : { type : Date, default: Date.now },
});

module.exports = mongoose.model('approval',WaitForApproval);
