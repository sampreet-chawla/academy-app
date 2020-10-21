const Cohort = require('../models/cohort');
const Student = require('../models/student');

const loadSeedData = () => {
	Cohort.find({}).deleteMany(() => {
		Student.find({})
			.deleteMany(() => {
				Cohort.create({
					cohortName: 'Software Engineering Immersive',
				}).then((newClass) => {
					Promise.all([
						Student.create({
							studentName: 'Max Thompson',
							age: 20,
						}).then((student) => {
							newClass.students.push(student);
						}),
						Student.create({
							studentName: 'Elva Edison',
							age: 25,
						}).then((student) => {
							newClass.students.push(student);
						}),
					]).then(() => {
						newClass.save();
					});
				});
				Cohort.create({
					cohortName: 'Data Science Immersive',
				}).then((newClass) => {
					Promise.all([
						Student.create({
							studentName: 'Alison Roman',
							age: 22,
						}).then((student) => {
							newClass.students.push(student);
						}),
					]).then(() => {
						newClass.save();
					});
				});
				return 'success';
			})
			.catch((err) => {
				console.log('Error loading seed data: ', err.message);
				return err.message;
			});
	});

	return 'success';
};

module.exports = loadSeedData;
