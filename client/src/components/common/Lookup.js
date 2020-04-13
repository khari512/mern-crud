import React, {useState,useEffect} from 'react';
import Select from 'react-select';
import axios from 'axios';
import { get } from 'lodash';

const Lookup = ( props ) => {
    const [options, setOptions ] = useState(props.options || []);
    const [ selectedOption, setSelectedOption ] = useState('');
    const { name, changeHandler, endpoint, depedentField, value, depedentFieldValue } = props;
    //const depedentFieldValue = depedentField && depedentField.value;

    const compileParams = () => {
       const { q } = endpoint || {};
       const { name, value } = depedentField || {};

       return  name && 
               name === q && 
               value && 
               `${q}=${value}`;

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
           const selectedOption = options && options.find( option => option.value == value )
           selectedOption && setSelectedOption(selectedOption);

        }).catch(err => {
            setOptions([]);
            console.error(err);
        })
    }, [ depedentFieldValue ] );


    useEffect( () => {
        const selectedOption = options && options.find( option => option.value == value )
        selectedOption && setSelectedOption(selectedOption);
    }, [ value, depedentFieldValue ]);
  

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