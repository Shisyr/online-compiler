const express = require('express');
const bodyParser = require('body-parser');
const ejsLocals = require('ejs-locals');
const path = require('path');

var app = express();
app.engine('ejs', ejsLocals);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/', require('./routes/index.js'));

app.listen(6800, ()=>{
  console.log("The server successfully started by 5000 port!");
});
