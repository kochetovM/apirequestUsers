import React, {useState} from 'react';
import ItemisAddress from "./ItemisAddress";

const icon_cancel = (<svg className="bi bi-x-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
    <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
    </svg>);
const icon_edit = (<svg className="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
    <path
        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
    <path fill-rule="evenodd"
          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>);

const icon_submit = (
    <svg className="bi bi-check-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
         xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path fill-rule="evenodd"
              d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
    </svg>);

function Column(props) {

    const [isEditValueOn, setIsEditValueOn] = useState(false);
    const [itemInput, setItemInput] = useState(props.item_value);
    //const [priorityInput, setPriorityInput] = useState('');

    const onTaskChange = (e) => {
        setItemInput(e.target.value);
    };

    const editOn = () => {
        setIsEditValueOn(true);
    };

    const taskReset = () => {
        setIsEditValueOn(false);
    };

    const taskSubmit = (e) => {
        e.preventDefault();
        console.log(itemInput);
        //console.log(priorityInput);

        props.change_item(props.id,props.item_key,itemInput);

        taskReset();
    };

    return (
        <td className="">
            {!isEditValueOn &&  props.item_value
                /*(props.item_key!='address')?
                    props.item_value :
                    show_address(props.item_value)*/
            }
            {!isEditValueOn &&
                <span className="stepahead btn-outline-info" onClick={() =>editOn() } >
                    {icon_edit}
                </span>
            }

            {isEditValueOn && (props.item_key!='address') &&
                <form className="addnewitem_style">
                    <span className="form-group">
                        <input type="text" className="form-control"
                               value={itemInput}
                               onChange={onTaskChange}/>
                    </span>
                    <span  className="btn-outline-info "
                            onClick={taskSubmit}>{icon_submit}
                    </span>
                    <span  className="stepahead btn-outline-info"
                           onClick={taskReset}>{icon_cancel}
                    </span>
                </form>
            }

            {(props.item_key=='address') && isEditValueOn &&
                <ItemisAddress id={props.id} address={props.el} taskReset={taskReset} change_item={props.change_item} />
             }
        </td>
    );
}

export default Column;