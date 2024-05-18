const express = require('express');
const auth = require('../middleware/auth');
const Note = require('../models/Note');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { content } = req.body;
  try {
    const newNote = new Note({
      userId: req.user.id,
      content,
    });

    const note = await newNote.save();
    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    console.log(req)
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });

    if (note.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });

    await note.deleteOne();
    res.json({ msg: 'Note removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
