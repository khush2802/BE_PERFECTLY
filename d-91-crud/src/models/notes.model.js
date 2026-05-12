const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
     title: {type: String, required: true},
     body: {type: String, required: true},
     age: {type: Number, required: true}
});

const notesModel = mongoose.model("notes", notesSchema);

module.exports = notesModel;