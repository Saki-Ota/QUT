import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function fetchUser() {
  const url = "https://reqres.in/api/users/3";
  return fetch(url,  {
    headers: {
      'x-api-key': 'reqres-free-v1'
    }
  })
  .then((res) => res.json())
  .then((json) => json.data);
}



function App() {
  const [user, setUser] = useState({});
  
  return (
    <div>
      <h1>User Details</h1>
      <button onClick={() => fetchUser().then((user) => setUser(user))}>Get User</button>
      <ul>
        <li>First Name: {user.first_name}</li>
        <li>Last Name: {user.last_name}</li>
        <li>E: {user.email}</li>
      </ul>
    </div>
  );
}

export default App;
