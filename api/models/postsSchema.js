// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: mongoose.Types.ObjectId, ref: 'Author', required: true },
  createdAt: { type: Date, default: Date.now},
  status: { type: String, enum: ["DRAFT", "PUBLISHED"], default: "DRAFT" }
});

postsSchema.methods.toJSON = function(){
  return JSON.parse(JSON.stringify(this));
}

const Posts = mongoose.model('Posts', postsSchema)

module.exports = Posts;