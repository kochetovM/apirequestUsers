import React, {useState} from 'react';

const icon_filter = (<svg className="bi bi-filter" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd"
          d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
    </svg>);

const icon_close = (<svg className="bi bi-x-octagon" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                         xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd"
          d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1L1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"/>
    <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
    <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
    </svg>);


function TableHeader(props) {

    const [isfilterInputOn, setIsfilterInputOn] = useState(false);

    const filterOn = () => {
        setIsfilterInputOn(true);
    }
    const filterInputClose = () => {
        setIsfilterInputOn(false);
        props.addFilter(props.title,"");
    }

    const onFilterChange = (e) => {
        props.addFilter(props.title, e.target.value);
    };

    return (
        <th key={props.index} scope="col">
            {props.title}

            { (props.title!='id') && (!isfilterInputOn) ?
                 <span className="stepahead btn-outline-info" onClick={() => filterOn()}>
                        {icon_filter}
                 </span>
                :
                (props.title!='id') &&
                <>
                    <span className="flex-parent">
                        <input type="text" className=""  onChange={onFilterChange}/>
                        <span className="flex-child btn-outline-info" onClick={filterInputClose}>
                            {icon_close}
                        </span>
                    </span>

                </>
            }

        </th>

    );
}

export default TableHeader;