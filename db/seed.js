const Class = require('../models/class');
const Student = require('../models/student');

const loadSeedData = () => {
	Class.find({}).deleteMany(() => {
		Student.find({})
			.deleteMany(() => {
				Class.create({
					className: 'Software Engineering Immersive',
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
				Class.create({
					className: 'Data Science Immersive',
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
