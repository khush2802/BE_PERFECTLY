import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
const App = () => {

  const [notes,setNotes]= useState([]);


  function handleSubmit(e){
    e.preventDefault();
    const {title, description} = e.target.elements;

    axios.post("http://localhost:3000/api/notes",{
      title:title.value,
      description:description.value
    }).then((res)=>{
      console.log(res.data);
      getapi();
    })
  };


  function handleDelete(id){
    axios.delete("http://localhost:3000/api/notes/"+id)
    .then((res)=>{
      console.log(res.data);
      getapi();
    })
  }

  function getapi(){
    axios.get("http://localhost:3000/api/notes")
    .then((res)=>{
      setNotes(res.data.notes);
    });
  }

  useEffect(()=>{
    getapi();
  },[]);


  return (
    <>
    <form className = "note-form" onSubmit={handleSubmit}>
      <input type="text" placeholder='title' name='title'/>
      <input type="text" placeholder='description' name='description'/>
      <button type='submit'>Submit</button>
    </form>
    <div className="notes">{
      notes.map(note=>{
        return <div className="note">
        <h1>{note.title}</h1>
        <h3>{note.description}</h3>
        <button onClick={()=>{
          handleDelete(note._id);
        }}>Delete</button>
      </div>
      })}
    </div>
    </>
  )
}

export default App
