// Dependencies
const jwt = require('jwt-simple');
const { Clients, Author } = require('./../../models');

const validateClient = async context => {
  let token = context.headers["authorization"];

  if(!token || !token.includes("Bearer "))
    throw new Error("Invalid Token Format");
    
  token = token.split(' ')[1];
  let decoded = jwt.decode(token, process.env.SECRET);
  let client = await Clients.findById(decoded._id);
  
  if(!client)
    throw new Error("No User Found");

  return client;
}

const validateAuthor = async context => {
  let token = context.headers["authorization"];

  if(!token || !token.includes("Bearer "))
    throw new Error("Invalid Token Format");
    
  token = token.split(' ')[1];
  let decoded = jwt.decode(token, process.env.SECRET);
  let author = await Author.findById(decoded._id);
  
  if(!author)
    throw new Error("No User Found");

  return author;
}

module.exports = {
  validateClient,
  validateAuthor
}