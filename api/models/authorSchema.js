// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcrypt-nodejs');

const authorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, 
    validate: { validator: validator.isEmail, message: 'Invalid Email'} 
  },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  client: { type: Schema.Types.ObjectId, ref: 'Clients' },
  description: { type: String, default: 'none' },
});

authorSchema.methods.compareHash = function(password){
  return bcrypt.compareSync(password, this.password);
}


authorSchema.pre('save', function(next){
  let hashedPassword = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  this.password = hashedPassword;
  next();
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;