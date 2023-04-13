const mongoose = require("mongoose")

const listSchema = new mongoose.Schema({
    title: { type: String, required: false },
    description: { type: String, required: false },
    // completed: Boolean,
}, {
    timestamps: true
})

const List = mongoose.model('List', listSchema);

module.exports = List;