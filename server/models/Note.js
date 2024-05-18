// Note.js
const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, maxlength: 200 },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Note', NoteSchema);
