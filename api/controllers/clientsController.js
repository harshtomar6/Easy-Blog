// Dependencies
const { Clients } = require('./../models');
const { ObjectId } = require('mongodb');
const { generateToken } = require('./../../globals');

// Get All clients
const getAllClients = callback => {
  Clients.find({}, (err, success) => {
    return callback(err, success);
  })
}

// Get A Particular clients
const getClients = (clientsId, callback) => {
  if(!ObjectId.isValid(clientsId))
    return callback('Invalid clients Id', 400, null);
  
  Clients.findOne({_id: clientsId}, (err, data) => {
    if(err)
      return callback(err, 500, null);
    else if(!data)
      return callback('Clients Not Found', 404, null);
    else
      return callback(null, 200, data);
  });
}

// Add a clients
const addClients = (data, callback) => {

  Clients.findOne({email: data.email.toLowerCase()}, (err, client) => {
    if(err)
      return callback(err, 500, null);
    else if(client)
      return callback('Client already registered!', 400, null);
    else{
      let client = new Clients(data);
      client.email = client.email.toLowerCase();
      client.key = client.generateClientKey();

      client.save((err, success) => {
        if(err)
          return callback(err, 500, null);
        else
          return callback(null, 200, success);
      })
    }
  });
}

// Login Client
const loginClient = (data, callback) => {
  Clients.findOne({email: data.email.toLowerCase()}, (err, client) => {
    if(err)
      return callback(err, 500, null);
    else if(!client)
      return callback('No Client Found', 401, null);
    else{
      if(client.compareHash(data.password))
        return callback(null, 200, generateToken(client));
      else
        return callback('Invalid Password', 401, null);
    }
  })
}

// Modify a clients
const modifyClients = (clientsId, data, callback) => {
  if(!ObjectId.isValid(clientsId))
    return callback('Invalid Clients Id', 400, null);
  
  Clients.findOne({_id: clientsId}, (err, success) => {
    if(err)
      return callback(err, 500, null);
    else if(!success)
      return callback('Clients Not Found', 404, null);
    else{
      Clients.update({_id: clientsId}, data, (err, success) => {
        if(err)
          return callback(err, 500, null);
        else
          return callback(null, 200, success);
      });
    }
  });
}

// Delete a clients
const deleteClients = (clientsId, callback) => {
  if(!ObjectId.isValid(clientsId))
    return callback('Invalid Clients Id', 400, null);
  
  Clients.findOne({_id: clientsId}, (err, success) => {
    if(err)
      return callback(err, 500, null);
    else if(!success)
      return callback('Clients Not Found', 404, null);
    else{
      Clients.remove({_id: clientsId}, (err, success) => {
        if(err)
          return callback(err, 500, null);
        else
          return callback(null, 200, success);
      })
    }
  })
}

module.exports = {
  getAllClients,
  getClients,
  addClients,
  modifyClients,
  deleteClients,
  loginClient
}
    