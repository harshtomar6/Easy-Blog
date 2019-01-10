// Dependencies
const express = require('express');
const router = express.Router();

// Enable CORS
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
  next();
});

router.get('/', (req, res, next) => {
  res.send('API IS LIVE');
});

module.exports = router;
    