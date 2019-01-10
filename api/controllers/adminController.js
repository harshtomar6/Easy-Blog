// Dependencies
const { Admin } = require('./../models');
const { ObjectId } = require('mongodb');
const { generateToken } = require('./../../globals');

// Get All admin
const getAllAdmin = callback => {
  Admin.find({}, (err, success) => {
    return callback(err, success);
  })
}

// Get A Particular admin
const getAdmin = (adminId, callback) => {
  if(!ObjectId.isValid(adminId))
    return callback('Invalid admin Id', 400, null);
  
  Admin.findOne({_id: adminId}, (err, data) => {
    if(err)
      return callback(err, 500, null);
    else if(!data)
      return callback('Admin Not Found', 404, null);
    else
      return callback(null, 200, data);
  });
}

// Add a admin
const addAdmin = (data, callback) => {

  Admin.findOne({email: data.email.toLowerCase()}, (err, admin) => {
    if(err)
      return callback(err, 500, null);
    else if(admin)
      return callback('Admin already exists!', 400, null);
    else{
      let admin = new Admin(data);
      admin.email = admin.email.toLowerCase();
      admin.password = admin.genHash(data.password);
      admin.save((err, success) => {
        if(err)
          return callback(err, 500, null);
        else
          return callback(null, 200, success);
      });
    }
  });
}

// Login Admin
const loginAdmin = (data, callback) => {
  Admin.findOne({email: data.email.toLowerCase()}, (err, admin) => {
    if(err)
      return callback(err, 500, null);
    else if(!admin)
      return callback('No Admin Found', 401, null);
    else{
      if(admin.compareHash(data.password))
        return callback(null, 200, generateToken(admin));
      else
        return callback('Invalid Password', 401, null);
    }
  })
}

// Modify a admin
const modifyAdmin = (adminId, data, callback) => {
  if(!ObjectId.isValid(adminId))
    return callback('Invalid Admin Id', 400, null);
  
  Admin.findOne({_id: adminId}, (err, success) => {
    if(err)
      return callback(err, 500, null);
    else if(!success)
      return callback('Admin Not Found', 404, null);
    else{
      Admin.update({_id: adminId}, data, (err, success) => {
        if(err)
          return callback(err, 500, null);
        else
          return callback(null, 200, success);
      });
    }
  });
}

// Delete a admin
const deleteAdmin = (adminId, callback) => {
  if(!ObjectId.isValid(adminId))
    return callback('Invalid Admin Id', 400, null);
  
  Admin.findOne({_id: adminId}, (err, success) => {
    if(err)
      return callback(err, 500, null);
    else if(!success)
      return callback('Admin Not Found', 404, null);
    else{
      Admin.remove({_id: adminId}, (err, success) => {
        if(err)
          return callback(err, 500, null);
        else
          return callback(null, 200, success);
      })
    }
  })
}

module.exports = {
  getAllAdmin,
  getAdmin,
  addAdmin,
  modifyAdmin,
  deleteAdmin,
  loginAdmin
}
    