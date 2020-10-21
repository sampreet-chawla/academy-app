const { Schema, model } = require('../db/conn');

const CohortSchema = Schema(
	{
		cohortName: { type: String, required: true },
		// year: { type: Number, required: true },
		students: [{ ref: 'Student', type: Schema.Types.ObjectId }],
	},
	{ timestamps: true }
);

const Cohort = model('Cohort', CohortSchema);

module.exports = Cohort;
