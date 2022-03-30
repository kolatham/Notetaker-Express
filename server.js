const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require("./db/db.json")

const nid = require('nid');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));



app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));


app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));


app.get('/test', (req, res) => res.sendFile(path.join(__dirname, 'public/test.html')));


app.get('/api/notes', (req, res) => res.json(db));


app.post('/api/notes', (req, res) => {

    const note = req.body;

    note.id = nid();
    
 
    db.push(note);
    console.log(note, "New note added successfuly");
    res.json(true);
});


app.delete('/api/notes/:id', (req, res) => {
    const deleteId = req.params.id;

    for (let i = 0; i < db.length; i++) {
        if (db[i].id === deleteId) {
            db.splice([i], 1)
        }
    }
    res.end();
})


app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
})