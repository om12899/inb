const express = require('express');
const router = express.Router();
var fetchuser = require("../middleware/Fetchuser");
const Note = require("../models/Notes");
const { body, validationResult } = require('express-validator');

//ROute 4 : Get all notes
router.get('/getnotes',fetchuser,async(req,res)=>{
    const notes = await Note.find({user : req.user.id});
    
    res.json(notes)
});
//Route 5 : Write Note
router.post('/addnote',fetchuser,[
    body('title','enter valid title').isLength({min:3}),
    body('description','description must me 5 chars').isLength({min:5})
],async(req,res)=>{
    const{title,description,tag} = req.body
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try {
        const note = new Note({
            title,description,tag,user : req.user.id
        })
        const savedNote = await note.save();
        
        res.json(savedNote)
    } catch (error) {
        console.log(error.message);

        res.status(500).send("Internal Server Error error occurred");
    }
    
});

//Route 6 : Edit Note
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const{title,description,tag} = req.body
    let newNote = {};
    if(title){
        newNote.title=title;
    }
    if(description){
        newNote.description=description;
    }
    if(tag){
        newNote.tag=tag;
    }

    let note = await Note.findById(req.params.id)
    if(!note){
        res.status(404).send('Not found 404!!')
    }
    if(note.user.toString()!=req.user.id){
        res.status(401).send('401 Access Denied')
    }
    note = await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new:true})
    try {
        note = await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new:true})
        res.json(note)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error error occurred");
    }
    
});
 

//Route 7 : Delete Note

router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    const{title,description,tag} = req.body
    let note = await Note.findById(req.params.id)
    if(!note){
        res.status(404).send('Not found 404!!')
    }
    if(note.user.toString()!=req.user.id){
        res.status(401).send('401 Access Denied')
    }

    try {
        note = await Note.deleteOne({'_id':req.params.id,})

        
        res.json({Status : 'Deleted successfully'})
    } catch (error) {
        console.log(error.message);

        res.status(500).send("Internal Server Error error occurred");
    }
    
});


module.exports = router;