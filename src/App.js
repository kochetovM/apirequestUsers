import React, {useState} from 'react';
import './App.css';
import Table from "./Table";
import axios from 'axios';
import debounce from "lodash.debounce";

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
          //console.log(response.data);
          setIsLoading(false);
    }).catch(error => console.log(error));
  };

  window.onscroll = debounce(() => {
    if (isLoading)  return;

    if ((window.innerHeight + document.documentElement.scrollTop)
        === (document.documentElement.offsetHeight)) { loadMore(); }
  });

  const loadMore = () => {
      let id = users.length;
      setIsLoading(true);

      axios({
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/users',
      })
      .then((response) => {
          const nextUsers = response.data.map((el) => {
              id++;
              el.id = id;
              return el;
          })

          const newUsers  = users.concat(nextUsers);
          setUsers(newUsers);
          setIsLoading(false);
      }).catch(error => console.log(error));
  }

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
        { (users.length==0)? "" : <Table lastEditModeReset={lastEditModeReset} runLastEditModeReset={runLastEditModeReset} remember_LastEditModeReset={remember_LastEditModeReset} change_item={change_item} users={users}/>
        }
        </div>

        {isLoading &&
         <div className="centerFlex">Loading...</div>
        }

    </div>
  );
}

export default App;
