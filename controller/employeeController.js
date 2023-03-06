const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const employeeModel = require('../models/db')

router.get('/',(req, res) => {
	res.render('./employee/addOrEdit',{viewTitle:"Insert Employee"})
})

router.post('/employee', (req, res) => {
	if(!req.body){
		return res.status(400).send("request body not found");
	}
    // if (!req.body._id) {
   		let employee = {
		fullName:req.body.fullName,
		email:req.body.email,
		mobile: req.body.mobile,
		city: req.body.city
	}

	var model = new employeeModel(req.body);
	model.save()
		.then(doc => {
			if(!doc || doc.length ===0){
				return res.status(500).send(doc);
			}else{
				return res.status(201).render('./employee/listEmployee',{success:'Employee Added'});
			}
		})
		.catch(err => {
			res.status(500).json(err)
		})
		
	 // }
	
		
});

//function to add employee
// function addRecord(req,res){
// 	let employee = {
// 		fullName:req.body.fullName,
// 		email:req.body.email,
// 		mobile: req.body.mobile,
// 		city: req.body.city
// 	}

// 	var model = new employeeModel(req.body);
// 	model.save()
// 		.then(doc => {
// 			if(!doc || doc.length ===0){
// 				return res.status(500).send(doc);
// 			}else{
// 				return res.status(201).render('./employee/addOrEdit',{success:'Employee Added'});
// 			}
// 		})
// 		.catch(err => {
// 			res.status(500).json(err)
// 		})
// }

//view data
router.get('/list', (req, res) => {
	employeeModel.find((err, docs)=>{
		if(!err){
			res.status(201).render('./employee/listEmployee', {list:docs})
		}else{
			res.status(500).json(err);
		}
	})
});



//edit data
router.get('/update/:id', (req, res) => {
	employeeModel.findById(req.params.id,(err, doc) => {
		if(!err){
			res.render('./employee/updateData',{
				viewTitle:"Update Employee",
				employee:doc
			})
		}
	})
})

//update post
router.post('/update',(req, res) => {
	employeeModel.findOneAndUpdate({_id:req.body._id}, req.body, {new:true})
		.then(doc =>{
			res.redirect('../list')
	})
});

//delete data

router.get('/delete/:id', (req, res) => {
	employeeModel.findByIdAndRemove(req.params.id, (err, doc) => {
		if(!err){
			res.redirect('../list')
		}
	})
})



module.exports = router;