import React, {useState} from 'react';
import './App.css';
import Table from "./Table";
import axios from 'axios';
import debounce from "lodash.debounce";

let filters = {};

function App() {

    const [initialUsers, setInitialUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lastEditModeReset, setLastEditModeReset] = useState(null); //Стейт используется для проверки если уже открыта другая ячейка с формой для редакторования

    const setFilters = (newFilters) => {
        filters = newFilters;
    }

    const addUsers = (newUsers) => {
        setInitialUsers([...newUsers]);
        console.log(initialUsers);
    }
    const filterUsers = (newUsers) => {
        setUsers([...newUsers]);
    }

    const apllyFiltersToUsers = () => { // здесь применяем  фильтры к изначальному списку юзеров

        let flagIsFilterEmpty=true;
        for (let x in filters) {
            flagIsFilterEmpty = false;
            break; }

        if( flagIsFilterEmpty) { //если фильтров нет то возобновляем список
            filterUsers(initialUsers); }

        else {
            let newUsers=[...initialUsers];
            for (let key in filters) {

                if ((key != "address")&&(key != "company"))
                    newUsers = newUsers.filter((userObject) => userObject[key].toLowerCase().includes(  filters[key].toLowerCase().trim()  ));

                if (key == "address") {
                    newUsers = newUsers.filter((el) => (el.address["street"] + " " + el.address["suite"] + " " + el.address["city"] + " " + el.address["zipcode"]).toLowerCase().includes( filters[key].toLowerCase().trim() ));
                }

                if (key == "company") {
                    newUsers = newUsers.filter((userObject) => userObject[key]["name"].toLowerCase().includes(  filters[key].toLowerCase().trim()  ));
                }

            }
            filterUsers(newUsers);
        }
    }

    const change_item = (id, item_key, newInput, suite, city, zipcode) => {
        // в этой функции меняем значение поля в массиве списка Юзеров по введеному значению input в таблице
        let index = 0;
        let newlist = initialUsers.map(el => el)

        newlist.map((el, i) => {
            if (el.id == id) index = i
        })

        if (item_key != "address" && item_key != "company")
            newlist[index][item_key] = newInput;

        if (item_key == "address") {
            newlist[index][item_key]["street"] = newInput;
            newlist[index][item_key]["suite"] = suite;
            newlist[index][item_key]["city"] = city;
            newlist[index][item_key]["zipcode"] = zipcode;
        }

        if (item_key == "company") {
            newlist[index][item_key]["name"] = newInput;
        }

        addUsers(newlist);
        apllyFiltersToUsers();
    }

    const load = () => { // 1ая загрузка юзеров из сервера
        setIsLoading(true);

        axios({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/users',
        })
            .then((response) => {
                addUsers(response.data);
                filterUsers(response.data);
                //console.log(response.data);
                setIsLoading(false);
            }).catch(error => console.log(error));
    };

    window.onscroll = debounce(() => {
        if (isLoading) return;

        if ((window.innerHeight + document.documentElement.scrollTop)
            > (document.documentElement.offsetHeight-20)) {
            loadMore();
        }
    });

    const loadMore = () => { // последующая дозагрузка юзеров из сервера при скролинге
        let id = initialUsers.length;
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

                const newUsers = [...initialUsers,...nextUsers];
                addUsers(newUsers);
                apllyFiltersToUsers();
                setIsLoading(false);
            }).catch(error => console.log(error));
    }

    const remember_LastEditModeReset = (editModeOnReset) => {
        if (editModeOnReset != null) setLastEditModeReset([editModeOnReset]);
        else setLastEditModeReset(null);
    } // - запоминаем фукнцию закрытия формы редактирования с ячейки где мы ее открыли

    const runLastEditModeReset = () => {
        if (lastEditModeReset != null) lastEditModeReset.map(x => x());
        setLastEditModeReset(null);
    } // - вызываем функцию закрытия формы редактирования другой ячейки где открывали а затем сохраняем в стейт нул для обозначения что таких на данный момент больше нет

    return (
        <div className="">
            {isLoading ? < button className="btn btn-outline-info header" disabled={isLoading}>Loading..</button>
                : < button className="btn btn-outline-info header" onClick={load}>Load Users</button>
            }
            <a className="stepahead" href="https://github.com/rusbur/apirequestUsers">github link</a>

            <div className="tablestyle">
                {(initialUsers.length == 0) ? "" : <Table apllyFiltersToUsers={apllyFiltersToUsers} lastEditModeReset={lastEditModeReset}
                                                   runLastEditModeReset={runLastEditModeReset}
                                                   remember_LastEditModeReset={remember_LastEditModeReset}
                                                   change_item={change_item} users={users}
                                                   initialUsers={initialUsers}
                                                   filters={filters} setFilters={setFilters}/>
                }
            </div>

            {isLoading &&
                <div className="centerFlex"> Loading...</div>
            }

        </div>
    );
}

export default App;
