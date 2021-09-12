const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const fs = require('fs');
const PORT = 3002;

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

  noteData.push(req.body);
  console.log(noteData)

  fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
    err ? console.log(err) : console.log('Success!')})
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});