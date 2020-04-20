import React, { useState} from 'react';
import classnames from 'classnames';

const Number = ( props ) => {

    const { name, error, changeHandler, className='' } = props;
    const [value, setValue] = useState(props.value);

    const onChange = ( e ) => { 
       
        setValue(e.target.value);
        changeHandler && changeHandler( { [name] : e.target.value } );
    }

    const removeExponentFn = ( e ) => {
        var invalidChars = [
          "-",
          "+",
          "e",
          "E"
        ];
        if (invalidChars.includes(e.key)) {
          e.preventDefault();
        }
      }
     

    return ( <input
            {...props}
            onChange={onChange}
            onKeyDown={removeExponentFn}
            value={value}
            error={error}
            id={`user-update-${name}`}
            type='number'
            className={classnames(`form-control ${className}`, {
                'is-invalid': error
            })}
        /> 
    );

}

export default Number;