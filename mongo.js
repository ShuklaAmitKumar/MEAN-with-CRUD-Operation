/*
const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app
const app = express();

const product = require('./routes/route'); // Imports routes

let port = 8180;

app.use('/products', product);

app.get('/home',function(req,res){
    res.send("ok");
})

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

*/

// Above are basic set-up for creating api 
const express = require('express');
const bodyParser = require('body-parser');

const product = require('./routes/route'); // Imports routes for the products
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://127.0.0.1:27017/CRUD';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB,{ useNewUrlParser: true });        //create connection
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);

process.env.PORT = 8180;
// console.log(process.env);
// console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
    console.log('Server is up and running on port numner ' + process.env.PORT);
});