import React, {useState} from 'react';
import Column from "./Column";

const icon_edit = (<svg className="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
    <path
        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
    <path fill-rule="evenodd"
          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>);

function Table(props) {
/*
  const editOn = () => {
    if (props.lastEditModeReset!=null)  {
        props.runLastEditModeReset(); // - если была открыта форма ред. в другой ячейки то мы ее закрываем
    }
    props.remember_LastEditModeReset(editModeOnReset); // - запоминаем текущую форму закрытия режима редактирования поля
    setIsEditValueOn(true);
  };*/

  return (
    <div className="table-responsive">

        <table className="table table-hover table-bordered">
            <thead>
            <tr className="">
                {Object.keys(props.users[0]).map(  el => <th scope="col">
                    {el}

                    {/*{!isfilterValueOn &&
                    <span className="stepahead btn-outline-info" onClick={() => editOn()}>
                    {icon_edit}
                    </span>
                    }*/}
                </th>)
                }
            </tr>
            </thead>

            <tbody>
                {props.users.map(el =>(
                    <tr className="">
                        <th scope="row">{el.id}</th>
                        <Column lastEditModeReset={props.lastEditModeReset} runLastEditModeReset={props.runLastEditModeReset} remember_LastEditModeReset={props.remember_LastEditModeReset} change_item={props.change_item} id={el.id} item_value={el.name} item_key={"name"} />
                        <Column lastEditModeReset={props.lastEditModeReset} runLastEditModeReset={props.runLastEditModeReset} remember_LastEditModeReset={props.remember_LastEditModeReset} change_item={props.change_item} id={el.id} item_value={el.username} item_key={"username"} />
                        <Column lastEditModeReset={props.lastEditModeReset} runLastEditModeReset={props.runLastEditModeReset} remember_LastEditModeReset={props.remember_LastEditModeReset} change_item={props.change_item} id={el.id} item_value={el.email} item_key={"email"} />

                        <Column lastEditModeReset={props.lastEditModeReset} runLastEditModeReset={props.runLastEditModeReset} remember_LastEditModeReset={props.remember_LastEditModeReset} change_item={props.change_item} id={el.id} item_value={el.address["street"]+" "+ el.address["suite"]+" "+el.address["city"]+" "+el.address["zipcode"] } item_key={"address"} el={el.address} />

                        <Column lastEditModeReset={props.lastEditModeReset} runLastEditModeReset={props.runLastEditModeReset} remember_LastEditModeReset={props.remember_LastEditModeReset} change_item={props.change_item} id={el.id} item_value={el.phone} item_key={"phone"} />
                        <Column lastEditModeReset={props.lastEditModeReset} runLastEditModeReset={props.runLastEditModeReset} remember_LastEditModeReset={props.remember_LastEditModeReset} change_item={props.change_item} id={el.id} item_value={el.website} item_key={"website"} />
                        <Column lastEditModeReset={props.lastEditModeReset} runLastEditModeReset={props.runLastEditModeReset} remember_LastEditModeReset={props.remember_LastEditModeReset} change_item={props.change_item} id={el.id} item_value={el.company["name"]} item_key={"company"} />
                    </tr>)
                )}
            </tbody>
        </table>

    </div>
  );
}

export default Table;
