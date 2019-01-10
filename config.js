// Dependencies
const jwt = require('jwt-simple');
const controllers = require('./api/controllers');

const validateAdmin = (req, res, next) => {
  let token = req.headers['authorization'];

  if(token){
    token = token.split(' ')[1];
    try{
      let decoded = jwt.decode(token, process.env.SECRET);
      controllers.admin.getAdmin(decoded.user._id, (err, status, data) => {
        if(status === 200){
          req.user = data;
          next();
        }else
          res.status(status).send({err, data});
          
      })
    }catch(err){
      console.log(err)
      res.status(500).send({err: 'Cannot authenticate', data: null});
    }
  }
}

module.exports = {
  validateAdmin
}