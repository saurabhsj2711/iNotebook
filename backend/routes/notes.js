const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router()
const {body,validationResult} = require('express-validator'); // data validation
const Note = require('../models/Note');


//Route 1 : Get all notes of user /api/notes/fetchnotes

router.get('/fetchallnotes',fetchuser, async(req,res)=>{

    const id = req.user.id;

    const allNotes = await Note.find({userid:id}); // fetch notes by matching user id


    res.json(allNotes); // display notes
})

//Route 2 : Add new notes /api/notes/addnote

router.post('/addnote',fetchuser,
    [body("title","Enter valid Title").isLength({min:5}),
    body("desc","Description should not be blank").isLength({min:1})], async(req,res)=>{

        let success = true;

        try {
            
        //Validate title and description of notes.
        const error = validationResult(req);

        if(!error.isEmpty){
            success = false;
            return res.status(400).json({success,errors : error.array()});
        }

        const {title,desc,tag} = req.body;

        let note =  await Note.create(
            {
                title : title,
                desc : desc,
                tag : tag,
                userid : req.user.id
            }
        )

        const newNote =await note.save();
        res.send(newNote);
        } catch (error) {
            success = false;
          res.status(500).json({success,error : "Internal server error"});      
        }
})

    // Route 3 : Update the note using PUT request /api/notes/updatenote

    router.put('/updatenote/:id',fetchuser,
    async(req,res)=>{

        try {
            
        
        const {title,desc,tag} = req.body;

        

        let newnote = {};

        if(title){newnote.title=title;}
        
        if(desc){newnote.desc=desc;}
        
        if(tag){newnote.tag=tag;}
        

        let note =await Note.findById(req.params.id);
        
        if(!note){
            
            return res.status(404).send("Not found");
        }
        

        if(note.userid.toString() !== req.user.id){
            
            return res.status(401).send("Not allowed");
        }

        note =await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});

        res.json({note});

        } catch (error) {
            
            return res.status(500).json({errors : "Internal server error"});   
        }

    })


    // Route 4 : Delete the note using DELETE request /api/notes/deletenote

    router.delete('/deletenote/:id',fetchuser,
    async(req,res)=>{

        let success = true;

        try {
            
        

        let note =await Note.findById(req.params.id);

        if(!note){
            success = false;
            return res.status(404).send("Not found");
        }

        if(note.userid.toString() !== req.user.id){
            success = false;
            return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);

        res.json({success,"Message" : "Note deleted successfully!!"});
        } catch (error) {
            success = false;
            return res.status(500).json({success,error :"Internal Server error"});
        }

    })

module.exports = router;