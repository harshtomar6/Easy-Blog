// Dependencies
const express = require('express');
const router = express.Router();
const clientsController = require('./../controllers/clientsController');
const { validateAdmin } =require('./../../config');

// Enable CORS
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
  next();
});

// GET '/clients' Route to get all clients
router.get('/', (req, res, next) => {
  clientsController.getAllClients((err, success) => {
    if(err)
      res.status(500).json({err: err, data: null});
    else
      res.status(200).json({err: null, data: success});
  });
});

// GET '/clients/:clientsId' Route to get a particular clients
router.get('/:clientsId', (req, res, next) => {
  clientsController.getClients(req.params.clientsId, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// POST '/clients' Route to add new clients
router.post('/', validateAdmin, (req, res, next) => {
  clientsController.addClients(req.body, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// PUT '/clients/:clientsId' Route to modify clients
router.put('/:clientsId', (req, res, next) => {
  clientsController.modifyClients(req.params.clientsId, req.body, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// DELETE '/clients/:clientsId' Route to delete clients
router.delete('/:clientsId', (req, res, next) => {
  clientsController.deleteClients(req.params.clientsId, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  })
});

module.exports = router;
    