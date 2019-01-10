// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const adminSchema = Schema({
  name: { type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true}
});

adminSchema.methods.genHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  
adminSchema.methods.compareHash = function(password){
  return bcrypt.compareSync(password, this.password);
}

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;