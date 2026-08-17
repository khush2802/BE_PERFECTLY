import React, { useState, useEffect } from "react";
import api from "./services/api";

const App = () => {

  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");

  const [isEditing, setIsEditing] = useState(false);
const [editId, setEditId] = useState(null);


  // GET USERS
  const getUsers = async () => {

    const response = await api.get("/users");

    setUsers(response.data.users);

  };

  // ADD USER
  const addUser = async () => {

    const response = await api.post("/users/add", {
      firstName: firstName,
      lastName: lastName,
      age: age,
    });

    console.log(response.data);

    setUsers([...users, response.data]);

    setFirstName("");
    setLastName("");
    setAge("");

  };

  const editUser = (user) => {

  setFirstName(user.firstName);
  setLastName(user.lastName);
  setAge(user.age);

  setEditId(user.id);

  setIsEditing(true);

};

const deleteUser = async (id) => {

  await api.delete(`/users/${id}`);

  const newUsers = users.filter((user) => {

    return user.id !== id;

  });

  setUsers(newUsers);

};

  useEffect(() => {

    getUsers();

  }, []);

  return (

    <div>

      <h1>User List</h1>

      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <br />
      <br />

      <button onClick={addUser}>
        Add User
      </button>

      <hr />

      {
        users.map((user) => {

          return (

            <div class="post" key={user.id}>

              <h2>{user.firstName} {user.lastName}</h2>

              <p>Age : {user.age}</p>

              <p>Email : {user.email}</p>
               <button onClick={() => deleteUser(user.id)}>
          Delete
        </button>

              <hr />

            </div>

          );

        })
      }

    </div>

  );

};

export default App;