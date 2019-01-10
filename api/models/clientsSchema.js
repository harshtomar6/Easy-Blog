// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcrypt-nodejs');

const clientsSchema = Schema({
  name: {type: String, required: true},
  email: {
    type: String, required: true, unique: true,
    validate: {validator: validator.isEmail, message: 'Invalid Email Address'} 
  },
  password: { type: String, required: true, default: 'n0p@$$W0rD'},
  photoURI: {type: String, default: 'none'},
  about: {type: String, default: 'none'},
  key: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  meta: {type: Object}
});

clientsSchema.methods.generateClientKey = function(){
  return bcrypt.hashSync(this.name+this.email+this.createdAt.toString(), bcrypt.genSaltSync(8));
}

clientsSchema.methods.compareHash = function(password){
  return bcrypt.compareSync(password, this.password);
}

clientsSchema.pre('save', function(next){
  let hashedPassword = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  this.password = hashedPassword;
  next();
})

const Clients = mongoose.model('Clients', clientsSchema);

module.exports = Clients;