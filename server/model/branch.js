const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
  branchImg: {type: String},
  branch_name: {type: String},
  semester_name: [{
    semester: {type: String},
    subject: [{
      subject_name: {type: String}
    }]
  }]
});

module.exports = mongoose.model('branch',BranchSchema);
