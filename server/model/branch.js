const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
  branchImg: {type: String},
  branch_name: {type: String, trim : true},
  semester_name: [{
    semester: {type: String, trim : true},
    subject: [{
      subject_name: {type: String, trim : true}
    }]
  }]
});

module.exports = mongoose.model('branch',BranchSchema);
