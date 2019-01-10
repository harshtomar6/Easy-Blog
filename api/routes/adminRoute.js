// Dependencies
const express = require('express');
const router = express.Router();
const adminController = require('./../controllers/adminController');

// Enable CORS
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
  next();
});

// GET '/admin' Route to get all admin
router.get('/', (req, res, next) => {
  adminController.getAllAdmin((err, success) => {
    if(err)
      res.status(500).json({err: err, data: null});
    else
      res.status(200).json({err: null, data: success});
  });
});

// GET '/admin/:adminId' Route to get a particular admin
router.get('/:adminId', (req, res, next) => {
  adminController.getAdmin(req.params.adminId, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// POST '/admin' Route to add new admin
router.post('/', (req, res, next) => {
  adminController.addAdmin(req.body, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// POST '/admin/login' Route to login admin
router.post('/login', (req, res) => {
  adminController.loginAdmin(req.body, (err, status, data) => {
    res.status(status).send({err, data});
  })
})

// PUT '/admin/:adminId' Route to modify admin
router.put('/:adminId', (req, res, next) => {
  adminController.modifyAdmin(req.params.adminId, req.body, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// DELETE '/admin/:adminId' Route to delete admin
router.delete('/:adminId', (req, res, next) => {
  adminController.deleteAdmin(req.params.adminId, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  })
});

module.exports = router;
    