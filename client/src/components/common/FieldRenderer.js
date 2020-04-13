import React, {useState, useEffect}  from 'react';
import classnames from 'classnames';
import Lookup from './Lookup';


const FieldRenderer = ( props = {} ) => {

    const fieldValue = props.value;
    const [value, setValue] = useState(props.value);

    const { 
            label='Label', 
            type='text', 
            error, 
            name='name', 
            changeHandler, 
            className='', 
            hidden=false 
        } = props;


    // Prepopulate the form values on edit click
    useEffect( () => {
        setValue(fieldValue);
    }, [fieldValue]);// gets triggered every time when field value changes from parent

    const renderField = () => {
    
        const { type='text' } = props;
    
        switch ( type.toLowerCase() ) {
    
            case 'lookup':
                return <Lookup
                    {...props}
                    onChange={ (e) => {
                        setValue(e.target.value);
                        changeHandler && changeHandler( { [name] : e.target.value } );
                    }}
                    value={value}
                    error={error}
                    id={`user-update-${name}`}
                    type={type}
                    className={classnames(`form-control ${className}`, {
                        invalid: error
                    })}
                
                />
            default:
                return <input
                        {...props}
                        onChange={ (e) => {
                            setValue(e.target.value);
                            changeHandler && changeHandler( { [name] : e.target.value } );
                        }}
                        value={value}
                        error={error}
                        id={`user-update-${name}`}
                        type={type}
                        className={classnames(`form-control ${className}`, {
                            invalid: error
                        })}
                    />
        }
        
    }

    return (
         <div className={classnames("row mt-2",{
             'd-none': hidden
         })}>
            <div className="col-md-3">
                <label htmlFor={label}>{label}</label>
            </div>
            <div className="col-md-9">
                { renderField() }
                <span className="text-danger">{error}</span>
            </div>
        </div>
    );

}

export default FieldRenderer;