const mongoose = require('mongoose')
const abilitySchema = require('./ability')

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
			enum: ['controller', 'duelist', 'initiator', 'sentinel']
		},
		country: {
			type: String,
			required: true,
		},
		abilities: [abilitySchema],
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
