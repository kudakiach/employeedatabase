const mongoose = require('mongoose');

let url = 'mongodb://localhost:27017/EmployeeDB';
mongoose.connect(url, {userNewUrlParser:true},(err) =>{
	if(!err){
		console.log("mongoDB connected successful")
	}else{ console.log('failed to connect' + err)}
})

var employeeSchema = new mongoose.Schema({
	fullName:{
		type:String,
		required:'This field is required'
	},
	email:{
		type:String,
		required:'This field is required'
	},
	mobile:{
		type:String,
		required:'This field is required'
	},
	city:{
		type:String,
		required:'This field is required'
	}
})


module.exports = mongoose.model('Employee', employeeSchema);