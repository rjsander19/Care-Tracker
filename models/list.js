const mongoose = require("mongoose")

const listSchema = new mongoose.Schema({
    title: String,
    description: String,
    item: String,
    completed: Boolean,
}, {
    timestamps: true
})

const list = mongoose.model('List', listSchema)

module.exports = list;