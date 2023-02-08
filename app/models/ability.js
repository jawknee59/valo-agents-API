// import dependencies
const mongoose = require('mongoose')

const abilitySchema = new mongoose.Schema ({
    button: {
        type: String,
        enum:['Q', 'E', 'C', 'X']
    },
    name: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = abilitySchema
