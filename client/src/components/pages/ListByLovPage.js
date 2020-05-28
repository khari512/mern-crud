import React, { useState, Component, Fragment } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import ReactDatatable from '@ashvin27/react-datatable';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import UpdateModal from "components/partials/UpdateModal";
import { toast, ToastContainer} from "react-toastify";
import DefaultLayout from "components/layout/DefaultLayout";
import FieldRenderer from 'components/common/FieldRenderer';

import EBDueListMetadata from "components/pages/metadata/eb-due-list";
import { get, isEmpty } from "lodash";
import Lookup from "components/common/Lookup";
//import Table from "components/common/Table";
import { getComponentType } from "utils/metadataUtils";
import ViewRenderer from "components/common/ViewRenderer";
import { getMetadata } from "utils/metadataUtils";

const EBDueList = ( props ) => {

    const { components=[], pageTitle = 'List', endpoints=[] } = getMetadata() || {};
    //const { pageTitle='', components=[] } = EBDueListMetadata;
    const [ pageState, setPageState ] = useState({});

    const changeHandler = ( selectedOption = {} ) => {
        setPageState(selectedOption);
        
    }

    const renderFields = ( ) => {

        return components.map(( field )=> {
            const componentType = getComponentType(field);
            const { label, name, type, className=''} = field;
            
            switch( componentType ){
                case 'Field':
                    return <FieldRenderer
                                changeHandler={changeHandler}
                                label={label}
                                name={name}
                                type={type}
                                className={className}
                                {...field}
                            />
                case 'View':
                    return <ViewRenderer
                                parentPageState={ pageState }
                                {...field}
                            />
                default:
                    return <div></div>
            }
           
        });
    }

    return (
        <DefaultLayout>
            <div id="page-content-wrapper">
                <div className="container-fluid">
                    <button className="btn btn-link mt-3" id="menu-toggle">
                        <FontAwesomeIcon icon={faList}/>
                    </button>
                    
                    <h5 className="mt-2 text-primary mb-4">{pageTitle}</h5>
                    { renderFields() }
                
                </div>
            </div>
        </DefaultLayout>
    );
}


EBDueList.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(EBDueList);
