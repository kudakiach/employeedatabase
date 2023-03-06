const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
	fullname:{
		type:String
	},
	email:{
		type:String,
		required:true
	},
	mobile:{
		type:String
	},
	city:{
		type:String
	}
})

mongoose.model('Employee', employeeSchema);