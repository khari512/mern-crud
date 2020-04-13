import React, { Component, Fragment } from "react";
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

import EBListMetadata from "components/pages/metadata/ebListMetadata";

class EBEntry extends Component {

    constructor(props) {
        super(props);

        this.columnFields = [];

        const { components = [] } = EBListMetadata;

        components.map(( field )=> {
    
            const { label, name } = field;
    
            this.columnFields.push({
                key: name,
                text: label,
                className: name,
                align: "left",
                sortable: true,
            });
        
        });

        this.columns = [
            ...this.columnFields,
            {
                key: "action",
                text: "Action",
                className: "action",
                width: 100,
                align: "left",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                data-toggle="modal"
                                data-target="#update-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editRecord(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => this.deleteRecord(record)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ];

        this.config = {
            page_size: 10,
            length_menu: [ 10, 20, 50 ],
            filename: "EBEntry",
            no_data_text: 'Loading....',
            button: {
                excel: true,
                print: true,
                csv: true
            },
            language: {
                length_menu: "Show _MENU_ result per page",
                filter: "Filter in records...",
                info: "Showing _START_ to _END_ of _TOTAL_ records",
                pagination: {
                    first: "First",
                    previous: "Previous",
                    next: "Next",
                    last: "Last"
                }
            },
            show_length_menu: true,
            show_filter: true,
            show_pagination: true,
            show_info: true,
        };

        this.state = {
            records: []
        };

        this.state = {
            currentRecord: {
                id: '',
                lab: '',
                projectTitle: '',
                projectNo: '',
                ebNumber: '',
                actionPts: '',
                date: ''
            },
            isEditView: false
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData()
    };

    componentWillReceiveProps(nextProps) {
        this.getData()
    }

    getData() {
        axios
            .post("/api/eb-entries-data")
            .then(res => {
                if(res && res.data && res.data.length <=0 ){
                    this.config.no_data_text='NO EB Entries found.'
                }
                this.setState({ records: res.data})
            })
            .catch( err => {
                this.config.no_data_text='NO EB Entries found.'
            })
    }

    editRecord(record) {
        this.setState({ currentRecord: record, isEditView: true});
    }

    deleteRecord(record) {
        axios
            .post("/api/eb-entry-delete", {_id: record._id})
            .then(res => {
                if (res.status === 200) {
                   toast(res.data.message, {
                       position: toast.POSITION.TOP_CENTER,
                   })
                }
            })
            .catch();
        this.getData();
    }

    pageChange(pageData) {
        console.log("OnPageChange", pageData);
    }

    onModalClose(){
        this.setState({isEditView: false});
    }

    render() {
        
        return (
            <DefaultLayout>
                    <h1>EBDueLISt</h1>
                    <UpdateModal 
                        record={this.state.currentRecord}
                        metadata={EBListMetadata}
                        isEditView={this.state.isEditView}
                        onClose={ this.onModalClose }
                    />
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <button className="btn btn-link mt-3" id="menu-toggle">
                                <FontAwesomeIcon icon={faList}/>
                            </button>
                            <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#update-modal">
                                <FontAwesomeIcon icon={faPlus}/> Add 
                            </button>
                            <h1 className="mt-2 text-primary">EBEntry List</h1>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.records}
                                columns={this.columns}
                                onPageChange={this.pageChange.bind(this)}
                            />
                        </div>
                    </div>

            </DefaultLayout>
        );
    }

}

EBEntry.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(EBEntry);
