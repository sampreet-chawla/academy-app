const { Schema, model } = require('../db/conn');

const ClassSchema = Schema(
	{
		className: { type: String, required: true },
		// year: { type: Number, required: true },
		students: [{ ref: 'Student', type: Schema.Types.ObjectId }],
	},
	{ timestamps: true }
);

const Class = model('Class', ClassSchema);

module.exports = Class;
