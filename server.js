const express = require('express');
const path = require('path');
let noteData = require('./db/db.json');
const uniqid = require('uniqid'); 
const fs = require('fs');
const PORT = process.env.PORT || 3002;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => res.json(noteData));

app.post('/api/notes', (req, res) => {

  req.body.id = uniqid();
  noteData.push(req.body);

  fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
    err ? res.status(500).json('Error in posting review') : res.status(201).json(noteData)})

});

app.delete('/api/notes/:id', (req, res) => {

  const filterTask = noteData.filter(task => task.id !== req.params.id);

  fs.writeFile("./db/db.json", JSON.stringify(filterTask), (err) => {
    err ? res.status(500).json('Error in posting review') : res.status(201).json(filterTask)})

  noteData = filterTask;
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});