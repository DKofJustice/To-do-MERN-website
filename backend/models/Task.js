const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    complete: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Task', TaskSchema)