import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([
    {
      title:"note1",
      description:"this is note1"
    },{
      title:"note2",
      description:"this is note2"
    },{
      title:"note3",
      description:"this is note3"
    }
  ]);

  function fetchNotes(){
    axios.get("http://localhost:3000/api/notes")
  .then((res)=>{
    console.log(res.data);
    setNotes(res.data.notes);
  });
  }

  useEffect(()=>{
    fetchNotes();
  },[])



  return (
    <>
    <div>
      {
        notes.map((note)=>{
          return<div>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            </div>
        })
      }
      
      
    </div>
    </>
  )
}

export default App
