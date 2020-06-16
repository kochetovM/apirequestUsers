import React, {useState} from 'react';
import Column from "./Column";

function Table(props) {

  return (
    <div className="table-responsive">

        <table className="table table-hover table-bordered">
            <thead>
            <tr className="">
                {Object.keys(props.users[0]).map(  el => <th scope="col">{el}</th>)
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
