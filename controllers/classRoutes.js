const Class = require('../models/class');
const Student = require('../models/student');
const loadSeedData = require('../db/seed');

const { Router } = require('express');
const router = Router();

router.get('/seed', async (req, res) => {
	const msg = loadSeedData();
	if (msg === 'success') {
		res.json({ status: 200, msg: 'seed data loaded successfully..' });
	} else {
		res.json({ status: 500, error: msg });
	}
});

// Write the route to list all classes
// GET ROUTE - ACTION INDEX
router.get('/', async (req, res) => {
	try {
		const data = await Class.find({}).populate('students');
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 500, error: err.message });
	}
});

// Write the route to create a class
// POST ROUTE - ACTION CREATE
router.post('/', async (req, res) => {
	try {
		await Class.create(req.body);
		const data = await Class.find({}).populate('students');
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 200, error: err.message });
	}
});

// Write the route to update a class
// PUT ROUTE - ACTION UPDATE
router.put('/id/:id', async (req, res) => {
	try {
		await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
		const data = await Class.find({}).populate('students');
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 200, error: err.message });
	}
});

// Adding Student ObjectId to Class
router.put('/id/:id/addStudent', async (req, res) => {
	try {
		const student = await Student.create(req.body);
		await Class.findByIdAndUpdate(
			req.params.id,
			{ $addToSet: { students: student.id } },
			{ new: true }
		);
		const data = await Class.find({}).populate('students');
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 200, error: err.message });
	}
});

// Remove Student ObjectId from Class
router.put('/id/:id/removeStudent/:studentId', async (req, res) => {
	try {
		const student = await Student.findByIdAndDelete(req.params.studentId);
		await Class.findByIdAndUpdate(
			req.params.id,
			{ $pull: { students: student.id } },
			{ new: true }
		);
		const data = await Class.find({}).populate('students');
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 200, error: err.message });
	}
});

// Delete Class
router.delete('/id/:id', async (req, res) => {
	try {
		const classRemoved = await Class.findByIdAndRemove({ _id: req.params.id });
		console.log('classRemoved', classRemoved.students);
		// TODO - Delete all students in a transaction
		const data = await Class.find({}).populate('students');
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 200, error: err.message });
	}
});

module.exports = router;
