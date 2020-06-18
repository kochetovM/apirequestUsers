import React, {useState} from 'react';
import Column from "./Column";
import TableHeader from "./TableHeader";

const tableHeadTitles = [
    "id", "name","username", "email","address","phone","website","company" ];

function Table(props) {

    const addFilter = (field,value) => {

        const updatedFilters = {...props.filters};

        if(!value.replace(/\s/g, '').length){   //if value only contains whitespace (ie. spaces, tabs or line breaks)
            delete updatedFilters[field]; // remove this key from filters
        }
        else { updatedFilters[field] = value;}

        props.setFilters(updatedFilters);
        props.apllyFiltersToUsers();
    }

    return (
    <div className="table-responsive">

        <table className="table table-hover table-bordered">
            <thead>
            <tr className="">
                {tableHeadTitles.map((title,index) =>
                    <TableHeader title={title} index={index}   addFilter={addFilter}  /> )}
            </tr>

            </thead>

            <tbody>
                {props.users.map(el =>(
                    <tr key={el.id} className="">
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
