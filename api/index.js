const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Note = require('./models/note');
const app = express();


app.use(cors());

const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/Note')
.then(() => console.log('Connected!'));

const db = mongoose.connection;

app.use(express.json());
app.use(cors());
const saltrounds = 10;


app.post('/addNote', async (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    });
    try {
        const savedNote = await note.save();
        res.status(200).send(savedNote);
    } catch (err) {
        res.status(400).send(err);
    }
});


app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).send(notes);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.delete('/notes/:id', async (req, res) => {
    try {
      const note = await Note.findByIdAndDelete(req.params.id);
      if (!note) return res.status(404).send('Note not found');
      res.status(200).send('Note deleted');
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.put('/notes/:id', async (req, res) => {
    try {
      const note = await Note.findByIdAndUpdate(
        req.params.id,
        { title: req.body.title, content: req.body.content },
        { new: true }
      );
      if (!note) return res.status(404).send('Note not found');
      res.status(200).send(note);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  
  
  
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
