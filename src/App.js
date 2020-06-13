import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Table from "./Table";

function App() {

  const [users, setUsers] = useState([])

  const change_item = (id,item_key,newInput,suite,city,zipcode) => {
      let index=0;

      users.map( (el,i) => {if(el.id==id) index=i} )
      let newlist = users.map( el=> el )

      if(item_key!="address" && item_key!="company")
            newlist[index][item_key] = newInput;

      if(item_key=="address") {
          newlist[index][item_key]["street"] = newInput;
          newlist[index][item_key]["suite"] = suite;
          newlist[index][item_key]["city"] = city;
          newlist[index][item_key]["zipcode"] = zipcode;
      }

      if(item_key=="company") {
           newlist[index][item_key]["name"] = newInput;
      }

      setUsers(newlist);
  }

  const load = () => {

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => {
              setUsers(json);
              console.log("Users loaded from db");
            }
        );
  };

  return (
    <div className="header">
       <button className="btn btn-outline-info" onClick={load}>Load Users</button>
        { users[0]==null? "" : <Table change_item={change_item} users={users}/>
        }
    </div>
  );
}

export default App;
