import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import {useNavigate} from "react-router-dom";

const Note = (props) => {

    const navigate = useNavigate();

    let context = useContext(noteContext);

    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate('/login');
        }
        
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    const [note,setNote] = useState({id:"",etitle:"",edesc:"",etag:""});

    const updateNote = (currentNote) => {
        setNote({id:currentNote._id,etitle:currentNote.title, edesc:currentNote.desc, etag:currentNote.tag});
        ref.current.click();
    }
    const handleClick = (e) => {
        props.showAlert("Updating...","primary");
        editNote(note.id,note.etitle,note.edesc,note.etag);
        props.showAlert("Note updated successfully","success");
        refClose.current.click();

    }

    const onChange = (e) => {
        setNote({...note,[e.target.name] : e.target.value});
    }

    return (
        <div>

            {/* <!-- Button trigger modal --> */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edesc" name="edesc" value={note.edesc} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edesc.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <AddNote showAlert={props.showAlert}/>
            <div className="container my-3">
                <div className="row">
                    <h1>Your Notes : </h1>
                    
                    {notes.length===0?<div className="container mx-3">No notes to display</div>:
                    notes.map((note) => {
                        return (<NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>);
                    })}
                    
                </div>
            </div>



        </div >
    )
}

export default Note;