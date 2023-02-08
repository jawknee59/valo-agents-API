const mongoose = require('mongoose')

const agentSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		agentNumber: {
			type: Number,
			required: true,
		},
		role: {
			type: String,
			required: true,
		},
		born: {
			type: String,
			required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Agent', agentSchema)
