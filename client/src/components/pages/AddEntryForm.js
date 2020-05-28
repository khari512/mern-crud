import React, { useState, Fragment, useEffect } from "react";

import PropTypes from "prop-types";
import {connect} from "react-redux";

import { toast, ToastContainer} from "react-toastify";
import DefaultLayout from "components/layout/DefaultLayout";
import FieldRenderer from 'components/common/FieldRenderer';
import { updateRecord } from "actions/commonActions";
import { routesConfig } from "pageConfigs";
import { get,find } from "lodash";
import { useHistory } from "react-router-dom";
import { getMetadata } from "utils/metadataUtils";


const AddEntryForm = ( props ) => {
    
    const [ modalFormState, setModalFormState ] = useState( {} );
    const [ errors, setErrors ] = useState({});
    const history = useHistory();
    const { updateRecord } = props;
    const { components=[], title = 'Add Entry', endpoints=[] } = getMetadata() || {};
    const updateEndpoint = endpoints.find( endpoint => endpoint.type === 'UPDATE' );
    
    useEffect( () => {
        setErrors(props.errors);
    },[ props.errors ]);

    useEffect( () => {
        const response = get(props,'auth.response',{});
        response.success && toast(response.message, {
            position: toast.POSITION.TOP_CENTER,
        })

    },[ props.auth.response ]);

  
    const clearFormData = ( ) => {

        for (var property in modalFormState) {
            if (modalFormState.hasOwnProperty(property)) {
                modalFormState[property]='';

            }
          }
        setModalFormState(modalFormState);
    };

    const onChange = value => {

        setModalFormState({
            ...modalFormState,
            ...value
        });
    };

    const onUpdate = e => {
        e.preventDefault();
        updateRecord(updateEndpoint, modalFormState)
        .then( res => {
            
            setTimeout(() => {
                history.push('/dashboard')
            }, 5000);
            
        });
    };

    const renderFields = ( ) => {

        return components.map(( field )=> {
    
            const { label, name, type, className='', dependentFieldName} = field;
    
            return <FieldRenderer
                        changeHandler={onChange}
                        label={label}
                        parentPageState={modalFormState}
                        value={modalFormState[name]}
                        error={errors[name]}
                        dependentField={ dependentFieldName }
                        name={name}
                        type={type}
                        className={className}
                        {...field}
                    />
        });
    }


    return (
        <DefaultLayout>
            <div className="container-fluid  justify-content-md-left" style={{"width":"50%"}}>
                <div className="form">
                    <h3 className="mb-4 mt-3">{title}</h3>
                    <form noValidate onSubmit={onUpdate} id="update-form">
                        { renderFields() }
                        <button type="Submit" className="btn btn-primary mt-3 float-right" >Submit</button>
                        <button type="button" 
                            className="btn btn-secondary float-right mt-3 mr-3"
                            onClick={clearFormData}
                        >
                            Clear
                        </button>
                    </form>
                </div>
            </div>

        </DefaultLayout>
    );

};


AddEntryForm.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(
    mapStateToProps,
    {updateRecord}
)(AddEntryForm);
