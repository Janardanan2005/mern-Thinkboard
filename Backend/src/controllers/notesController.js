import Note from "../models/Note.js"

export async function getAllNotes(req, res ) {
    try{
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes)
    
    }catch (error){
        console.error("Error in getAllNotes controller ",error);
        res.status(500).json({message:"Internal server error"})

    }
   
 }

 export async function getNoteById(req, res ) {
    try{
        const notes = await Note.findById(req.params.id)
       if(!notes) return res.status(404).json({message:"Note not found"});
        res.json(notes);

    
    }catch (error){
        console.error("Error in getNoteById controller ",error);
        res.status(500).json({message:"Internal server error"})

    }
   
 }


 export async function  createNotes(req, res) {

    try{
        const {title,content} = req.body
        const note = new Note({title, content})

       const savedNote = await note.save();
        res.status(201).json(savedNote);
    }catch(error){
        console.error("Error in createNote controller", error);
        res.status(500).json({message:"Internal serever error" });

    }
   
}

export async function updateNotes(req, res) {
    try{
        const {title,content} = req.body
        const updatedNotes = await Note.findByIdAndUpdate(req.params.id,{title,content},{
            new: true,
        })
        if(!updatedNotes) return res.status(404).json({message:"Note not found"});

        res.status(201).json(updatedNotes);

    } catch (error){
           console.error("Error in updateNotes controller", error);
        res.status(500).json({message:"Internal serever error" });


    }
    
}

export async function deleteNotes (req, res) {
    try{
        const deleteNote = await Note.findByIdAndDelete(req.params.id)
        if (!deleteNote) return res.status (404).json({message:"Note not found"});
          res.status(201).json(deleteNote);
    }catch(error){
        console.error("Error deleteNote controller", error);
        res.status(500).json({message:"Internal serever error" });


    }
    
}
 