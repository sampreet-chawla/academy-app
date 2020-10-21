const { Schema, model } = require('../db/conn');

const StudentSchema = Schema(
	{
		studentName: { type: String, required: true },
		age: { type: Number, required: true },
	},
	{ timestamps: true }
);

const Student = model('Student', StudentSchema);

module.exports = Student;
