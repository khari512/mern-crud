import React, { useState, useEffect } from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateRecord } from "../../actions/commonActions";
import { withRouter } from "react-router-dom";
import { get, isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';
import FieldRenderer from '../common/FieldRenderer';




const UpdateModal = ( props = {} ) => {

    const [ modalFormState, setModalFormState ] = useState( {} );
    const [ errors, setErrors ] = useState({});
    const { metadata={}, updateRecord, record, isEditView = false } = props;
    const { components=[], title = 'Update Form', endpoints=[] } = metadata;
    const actionType = isEditView ? 'UPDATE' : 'CREATE';
    const updateEndpoint = endpoints.find( endpoint => endpoint.type.toLowerCase() === actionType.toLowerCase() );

    const fieldValues = ( ) => {
        const values = {};
        components.map( field => {
            const { name } = field;
            
            values[name] = record[name];
        });
    
        return values;
    };

    useEffect( () => {
        setModalFormState( {...fieldValues()} );

    },[record]);

    //Renders Form Fields based on form metadata
    const renderFields = ( ) => {

        return components.map(( field )=> {
    
            const { label, name, type, className='', depedentFieldName} = field;
    
            return <FieldRenderer
                        changeHandler={onChange}
                        label={label}
                        value={modalFormState[name]}
                        error={errors[name]}
                        depedentFieldValue={modalFormState[depedentFieldName]}
                        depedentField={ { name: depedentFieldName, value : modalFormState[depedentFieldName] } }
                        name={name}
                        type={type}
                        className={className}
                        {...field}
                    />
        });
    }

    const onChange = value => {

        setModalFormState({
            ...modalFormState,
            ...value
        });
    };

    const onUpdate = e => {
        e.preventDefault();
debugger;
        updateRecord(updateEndpoint, modalFormState);
    };

    const closeModal = () => {

        const { onClose } = props;
        
        onClose && onClose();
    }

    return (
        <div>
            <div className="modal fade" id="update-modal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{title}</h4>
                            <button type="button" className="close" data-dismiss="modal" onclick={closeModal}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <form noValidate onSubmit={onUpdate} id="update-form">
    
                                { renderFields(metadata) }
                                
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button
                                form="update-form"
                                type="submit"
                                className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateRecord }
)(withRouter(UpdateModal));
