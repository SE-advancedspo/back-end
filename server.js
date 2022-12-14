const dotenv = require('dotenv').config()
const express=require('express')
const app=express()
const mongoose = require('mongoose')
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log("Listening on port " + listener.address().port)
})

const routes = require('./routes/routes')
app.use('/', routes)

mongoose.connect(
	process.env.MONGODB_URI,
	{useNewUrlParser: true, useUnifiedTopology: true},
	(err) => {
		if (err) return console.log("Error: ", err)
		console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
	}
);
