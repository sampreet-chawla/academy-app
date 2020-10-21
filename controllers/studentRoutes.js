const Student = require('../models/student');

const { Router } = require('express');
const router = Router();

// Write the route to list all students
// May not need if fetching for a class alone
// GET ROUTE - ACTION INDEX
router.get('/', async (req, res) => {
	try {
		const data = await Student.find({});
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 500, error: err });
	}
});

// Write the route to create a student
// POST ROUTE - ACTION CREATE
// router.post('/', async (req, res) => {
// 	try {
// 		await Class.create(req.body);
// 		res.json({ status: 200, data: data });
// 	} catch (err) {
// 		res.json({ status: 200, error: err.message });
// 	}
// });

// Write the route to update a student
// PUT ROUTE - ACTION UPDATE
router.put('/id/:id', async (req, res) => {
	try {
		const data = await Student.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 200, error: err.message });
	}
});

// Delete Student
// router.delete('/id/:id', async (req, res) => {
// 	try {
// 		await Author.deleteOne({ _id: req.params.id });
// 		const data = await Author.find({}).populate('cookbooks');
// 		res.json({ status: 200, data: data });
// 	} catch (err) {
// 		res.json({ status: 200, error: err.message });
// 	}
// });

module.exports = router;
