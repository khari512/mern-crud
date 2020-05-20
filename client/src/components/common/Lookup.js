import React, {useState,useEffect} from 'react';
import Select from 'react-select';
import axios from 'axios';
import { get, isEmpty } from 'lodash';

const Lookup = ( props ) => {
    const [options, setOptions ] = useState(props.options || []);
    const [ selectedOption, setSelectedOption ] = useState('');
    const { name, changeHandler, endpoint, dependentFieldName, value, parentPageState={} } = props;
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
        
        const compiledParams = compileParams();
        const params = compiledParams ? `?${compiledParams}` : '';
        const compiledUrl = endpoint && `${endpoint.url}${params}`;

        compiledUrl && axios.get(compiledUrl)
        .then(({ data }) => {

           const { responseMapping } = endpoint;
           const mappings = responseMapping && responseMapping.mappings
          
           const transformedOptions = data && data.map( obj => {
               const transformedObj={};
                
               mappings && mappings.map( ( mappingObj ) => {
                    const { from, to } = mappingObj;
                    transformedObj[to] = obj[from];
                });

               return  transformedObj;
            });

           const options = transformedOptions || data;
           setOptions(options);
           let selectedOption;

           if(options && options.length === 1 ){
            selectedOption = options[0];
            changeHandler && changeHandler( { [name] : selectedOption.value } );
           }
           else{
            selectedOption = options && options.find( option => option.value == value )
           }
          
           selectedOption && setSelectedOption(selectedOption);

        }).catch(err => {
            setOptions([]);
            console.error(err);
        })
    }, [ dependentFieldValue ] );


    useEffect( () => {
        const selectedOption = options && options.find( option => option.value == value )
        selectedOption && setSelectedOption(selectedOption);
    }, [ value, dependentFieldValue ]);
  

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        changeHandler && changeHandler( { [name] : selectedOption.value } );
    }

    return (
        <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
        />
    );

}

export default Lookup;