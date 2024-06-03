import React, { useState,useContext } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {

    const context = useContext(noteContext);
    const {addNote} = context;

    const [note,setNote] = useState({title:"", desc:"", tag:""});

    const handleClick = (e) => {
        
        e.preventDefault();
        addNote(note.title,note.desc,note.tag);
        props.showAlert("Note Added successfully!!","success");

        setNote({title:"",desc:"",tag:""});
        
    }

    const onChange = (e) =>{
        setNote({...note, [e.target.name] : e.target.value});
    }

    return (
        <div className="container my-3">
            <h1>Add a new note</h1>

            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input type="text" className="form-control" id="desc" name="desc" value={note.desc} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>
                
                <button disabled={note.title.length < 5 || note.desc.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>

        </div>
    )
}

export default AddNote;