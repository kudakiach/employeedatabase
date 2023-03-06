const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')
const handleBar = require('express-handlebars');

var employeeRouter = require('./controller/employeeController');

const app = express();

app.use(bodyParser.urlencoded({
	extended:true
}));
app.use(bodyParser.json());

app.set('views',path.join(__dirname,'/views/'))
app.engine('hbs', handleBar({extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/'}))
app.set('view engine', 'hbs');

app.use(employeeRouter);

app.listen(3000, () =>{
	console.log('Server started at port 3000');
})