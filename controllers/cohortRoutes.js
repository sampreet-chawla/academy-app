const Cohort = require('../models/cohort');
const Student = require('../models/student');
const loadSeedData = require('../db/seed');

const { Router } = require('express');
const router = Router();

// Route to load seed Data
router.get('/seed', async (req, res) => {
	const msg = loadSeedData();
	if (msg === 'success') {
		res.json({ status: 200, msg: 'seed data loaded successfully..' });
	} else {
		res.json({ status: 500, error: msg });
	}
});

// Get the list of  all cohorts
// GET ROUTE - ACTION INDEX
router.get('/', async (req, res) => {
	try {
		const data = await Cohort.find({}).populate('students');
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 500, error: err.message });
	}
});

// Get the Cohort for the id and all its student details
router.get('/id/:id', async (req, res) => {
	try {
		const data = await Cohort.find({ _id: req.params.id }).populate('students');
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 500, error: err.message });
	}
});

// Write the route to create a cohort
// POST ROUTE - ACTION CREATE
router.post('/', async (req, res) => {
	try {
		await Cohort.create(req.body);
		const data = await Cohort.find({}).populate('students');
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 500, error: err.message });
	}
});

// Write the route to update a cohort
// PUT ROUTE - ACTION UPDATE
router.put('/id/:id', async (req, res) => {
	try {
		await Cohort.findByIdAndUpdate(req.params.id, req.body, { new: true });
		const data = await Cohort.find({}).populate('students');
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 500, error: err.message });
	}
});

// Adding Student ObjectId to Class
router.put('/id/:id/addStudent', async (req, res) => {
	try {
		const student = await Student.create(req.body);
		await Cohort.findByIdAndUpdate(
			req.params.id,
			{ $addToSet: { students: student.id } },
			{ new: true }
		);
		const data = await Cohort.find({}).populate('students');
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 500, error: err.message });
	}
});

// Remove Student ObjectId from Class
router.put('/id/:id/removeStudent/:studentId', async (req, res) => {
	try {
		const student = await Student.findByIdAndDelete(req.params.studentId);
		await Cohort.findByIdAndUpdate(
			req.params.id,
			{ $pull: { students: student.id } },
			{ new: true }
		);
		const data = await Cohort.find({}).populate('students');
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 500, error: err.message });
	}
});

// Delete Cohort
router.delete('/id/:id', async (req, res) => {
	try {
		const cohortRemoved = await Cohort.findByIdAndRemove({
			_id: req.params.id,
		});
		console.log('cohortRemoved', cohortRemoved.students);
		// TODO - Delete all students in a transaction
		const data = await Cohort.find({}).populate('students');
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 500, error: err.message });
	}
});

module.exports = router;
