import React, {useState} from 'react';
import './App.css';
import Table from "./Table";
import axios from 'axios';

function App() {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastEditModeReset, setLastEditModeReset] = useState(null); //Стейт используется для проверки если уже открыта другая ячейка с формой для редакторования



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
    setIsLoading(true);

    axios({
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/users',
    })
        .then((response) => {
          setUsers(response.data);
          setIsLoading(false);
      });

  };


  const remember_LastEditModeReset = (editModeOnReset) => {
      if(editModeOnReset!=null) setLastEditModeReset([editModeOnReset]);
      else setLastEditModeReset(null);
  } // - запоминаем фукнцию закрытия формы редактирования с ячейки где мы ее открыли

  const runLastEditModeReset = () => {
      if(lastEditModeReset!=null) lastEditModeReset.map(x => x());
      setLastEditModeReset(null);
  } // - вызываем функцию закрытия формы редактирования другой ячейки где открывали а затем сохраняем в стейт нул для обозначения что таких на данный момент больше нет

  return (
    <div className="">
        {isLoading ? < button className="btn btn-outline-info header" disabled={isLoading} >Loading..</button>
            : < button className="btn btn-outline-info header" onClick={load}>Load Users</button>
        }
        <a className="stepahead" href="https://github.com/rusbur/apirequestUsers">github link</a>

        <div className="tablestyle">
        { users[0]==null? "" : <Table lastEditModeReset={lastEditModeReset} runLastEditModeReset={runLastEditModeReset} remember_LastEditModeReset={remember_LastEditModeReset} change_item={change_item} users={users}/>
        }
        </div>
    </div>
  );
}

export default App;
