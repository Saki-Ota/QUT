import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

// function fetchUser() {
//   const url = "https://reqres.in/api/users/3";
//   return fetch(url,  {
//     headers: {
//       'x-api-key': 'reqres-free-v1'
//     }
//   })
//   .then((res) => res.json())
//   .then((json) => json.data);
// }

function fetchUser(id) {
  const url = `https://reqres.in/api/users/${id}`;
  return fetch(url, {
    headers: {
      "x-api-key": "reqres-free-v1",
    },
  })
    .then((res) => res.json())
    .then((json) => json.data);
}

function App() {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(1);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser(userId).then((user) => setUser(user));
  }, [userId]);

  return (
    // <div>
    //   <h1>User Details</h1>
    //   <button onClick={() => fetchUser().then((user) => setUser(user))}>Get User</button>
    //   <ul>
    //     <li>First Name: {user.first_name}</li>
    //     <li>Last Name: {user.last_name}</li>
    //     <li>E: {user.email}</li>
    //   </ul>
    // </div>
    <div className="App">
      <h1>User Details</h1>
      <button disabled={userId === 1} onClick={() => setUserId(userId - 1)}>
        Previous
      </button>
      <button disabled={!userId} onClick={() => setUserId(userId + 1)}>
        Next
      </button>
      {user ? (
        <div>
          <img src={user.avatar} alt="Avatar"></img>
          <ul>
            <li>User id: {userId}</li>
            <li>First Name: {user.first_name}</li>
            <li>Last Name: {user.last_name}</li>
            <li>E: {user.email}</li>
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <label htmlFor="name">Hello, {name}!</label>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          console.log(event.target.elements.name.value); // output: 'value entered into name input'
        }}
      >
        <input id="name" name="name" type="text" value={name} 
        onChange={(event) => {
          const {value} = event.target;
          if(/[0-9]/.test(value)) {
            setError("Name shouln't contain numbers");
          } else {
            setError(null)
          }
          setName(event.target.value)
          }}/>
      </form>
    </div>
  );
}

export default App;
