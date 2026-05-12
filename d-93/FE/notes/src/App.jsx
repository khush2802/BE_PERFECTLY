import React from 'react'
import { useState } from 'react'
import axios from 'axios';


const App = () => {
   
  const [notes,setNotes] = useState([
      {
        title: "Learn React",
        description: "Complete React basics and hooks practice"
      },
      {
        title: "Build CRUD API",
        description: "Create Express and MongoDB CRUD operations"
      },
      {
        title: "Practice DSA",
        description: "Solve 5 array and string problems"
      },
      {
        title: "Study MongoDB",
        description: "Understand schemas, models, and queries"
      },
      {
        title: "Design UI",
        description: "Create responsive frontend components using Tailwind CSS"
      }
  ]);

  axios.get("http://localhost:3000/api/notes")
  .then((res)=>{
    // console.log(res.data);
    setNotes(res.data.notes);
  })

  return (
    <>
      <div className="notes">
       {
        notes.map(note=>{
          return <div className="note">
          <h3>{note.title}</h3>
          <p>{note.description}</p>
        </div>
        })
       }
        </div>    
    </>
  )
}

export default App
