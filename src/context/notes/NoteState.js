import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>{

  const host = "http://localhost:5000";
    const initial_notes = [];

    const [notes,setNotes] = useState(initial_notes);

    const getNotes = async() => {
      // API call

      const response = await fetch(`${host}/api/notes/fetchallnotes`,{
        method : "GET",
        headers : {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem("token")
        }
      });

      const json = await response.json();
      setNotes(json);
    }

    const addNote = async (title,desc,tag) => {

      //API call

      const response = await fetch(`${host}/api/notes/addnote`,{
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
          "auth-token" : localStorage.getItem("token")
        },
        body : JSON.stringify({title,desc,tag})
      });

      const json = await response.json();

      setNotes(notes.concat(json));
      
      

      // const note = {
      //   "_id": "64db9a3b3566661e0925e6e7",
      //   "userid": "64c4d32ae218ee5462a4e24a",
      //   "title": title,
      //   "desc": desc,
      //   "tag": tag,
      //   "date": "2023-08-15T15:31:07.709Z",
      //   "__v": 0
      // }

      // setNotes(notes.concat(note));
    }

    const deleteNote = async (id) => {

      const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
        method : "DELETE",
        headers : {
          "Content-Type" : "application/json",
          "auth-token" : localStorage.getItem("token")
        }
      });

      const json = await response.json();


      const newNotes = notes.filter((note)=>{return (note._id !==id)});
      setNotes(newNotes);
    }

    const editNote = async (id,title,desc,tag) =>{

      //API call

      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem("token")
        },
        body: JSON.stringify({title,desc,tag})
      });

      
      //Logic to edit a note
      const newNote = JSON.parse(JSON.stringify(notes));

      
      for(let index=0; index < newNote.length; index++){

        // const element = await notes[index];
        

        if(newNote[index]._id === id){
          
          newNote[index].title = title;
          newNote[index].desc = desc;
          newNote[index].tag = tag;
          
          break;
        }
      }

      setNotes(newNote);
    }


    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,getNotes,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;