import React, { useState, useEffect }  from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import { get, isEmpty } from "lodash";
import axios from "axios";

const Table = ( props ) => {

    const { endpoint={}, configurations={}, parentPageState={}, dependentFieldName} = props;
    const [columnFields, setColumnFields] = useState( [] );
    const [records, setRecords] = useState( [] );
    const [config, setConfig ] = useState( configurations );
    const dependentFieldValue = parentPageState[dependentFieldName];
    
    const compileParams = () => {
        const { params={} } = endpoint;
        let queryParam = '';
 
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const value = params[key];
                const querySepartor = isEmpty(queryParam) ? '' : '&' ;
                queryParam = queryParam + querySepartor +`${key}=${parentPageState[value]}`;
            }
        }
  
        return  queryParam;
 
     }

    useEffect( () => {

        const { url } = endpoint; 
        const queryParam =  compileParams();
        const compiledUrl =  isEmpty(queryParam) ? `${url}`: `${url}?${queryParam}` ;

        setConfig({
            ...config,
            no_data_text: 'Loading.....'
        });

        setRecords( [] );

        axios
            .get(compiledUrl)
            .then(res => {
                if(res && res.data && res.data.length <= 0 ){
                    this.config.no_data_text='NO EB Entries found.'
                }
                setRecords( res.data );
            })
            .catch( err => {
                setConfig({
                    ...config,
                    no_data_text: 'NO EB Entries found.'
                });
            })

    }, [ dependentFieldValue ] );



    useEffect( () => {
        const { columns =[] } = props;

        const fields = columns.map(( field )=> {
    
            const { label, name } = field;
    
            return {
                key: name,
                text: label,
                className: name,
                align: "left",
                sortable: true,
            };
        
        });
        setColumnFields( fields );

    },[ props.columns ]);

    if(!records || !columnFields){
        return <h5>No Records To Render Table</h5>
    }
    return (
        <React.Fragment>
             <br/>
            <ReactDatatable
                config={config}
                records={records}
                columns={columnFields}
            />
           
        </React.Fragment>
        
    );


}

//Table.prototype

export default Table;