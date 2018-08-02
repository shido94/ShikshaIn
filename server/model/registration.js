const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const Registration = new Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  Profession: { type: String, default: 'student' },
  college: String,
  postedAt: { type : Date, default: Date.now },
  typeOfDocument: [{type: Schema.Types.ObjectId, ref: 'Project' }]
});

module.exports = mongoose.model('register', Registration);
