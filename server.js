// Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const homeRoute = require('./api/routes/homeRoute');
const clientsRoute = require('./api/routes/clientsRoute');
const postsRoute = require('./api/routes/postsRoute');
const adminRoute = require('./api/routes/adminRoute');
const graphqlHTTP = require('express-graphql');
const Schema = require('./api/graphqlv3');
const cors = require('cors');

// Load dotenv variables
dotenv.load();

// Define PORT
const PORT = process.env.PORT || 3001;

// Connect to Database
mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true});

// Enable CORS
app.use(cors());

// Use body parser to parse post requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Logger middleware
app.use(logger('dev'));

// Use Routes
app.use('/', graphqlHTTP({
  schema: Schema,
  graphiql: true
}));
app.use('/clients', clientsRoute);
app.use('/posts', postsRoute);
app.use('/admin', adminRoute);

// Listen for HTTP Requests
app.listen(PORT, () => {
  console.log('Server is live at :'+PORT);
});
