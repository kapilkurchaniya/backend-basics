const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const noteModel = require('./models/notes.model');

app.post('/notes', async (req, res) => {
    const { title, description } = req.body;
        const note = await noteModel.create({ title, description });

    res.status(201).json({
        message: "note created successfully",
        note //        const note = await noteModel.create({ title, description }); iske karan call ho rha hai
    })
})
app.get('/notes', async (req, res) => {
    const notes = await noteModel.find();
    res.status(200).json({
        message: "all notes fetched successfully",
        notes
    })
})
app.delete('/notes/:id', async (req, res) => {
    const id  = req.params.id;
        // const {id}  = req.params;
    await noteModel.findByIdAndDelete(id);  
    res.status(200).json({
        message: "note deleted successfully"
    })
});
app.patch('/notes/:id', async (req, res) => {
    const id = req.params.id;
    const { title,description } = req.body;
    await noteModel.findByIdAndUpdate(id, { description });
    res.status(200).json({
        message: "note updated successfully"
    })
});

    
module.exports = app;