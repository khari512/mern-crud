import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUser } from "../../actions/userActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';
import FieldRenderer from '../common/FieldRenderer';

class UserUpdateModal extends React.Component {

    constructor(props) {
        super(props);

        const { id, name, email  } = this.props.record || {};

        const metadata = props.metadata; // metadat form 
        const record = props.record || {}; // Actual Data from service
        const initState = {};

        metadata.map( field => {
            const { name } = field;
           
            initState[name] = record[name];
        });

        console.log(initState);
        console.log(props);

        this.state = {
           ...initState,
            password: '',
            errors: {},
        };

    }

    
    componentWillReceiveProps(nextProps) {

        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                name: nextProps.record.name,
                email: nextProps.record.email,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.auth !== undefined
            && nextProps.auth.user !== undefined
            && nextProps.auth.user.data !== undefined
            && nextProps.auth.user.data.message !== undefined
            && nextProps.auth.user.data.success) {
            $('#update-user-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = value => {
        this.setState({ ...value });
    };

    onUserUpdate = e => {
        e.preventDefault();

        const newUser = {
            _id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        this.props.updateUser(newUser);
    };

    renderFields = () => {

        const { metadata=[] } = this.props;

        return metadata.map(( field )=> {

            const { label, name, type, className=''} = field;

            return <FieldRenderer
                        changeHandler={this.onChange}
                        label={label}
                        value={this.state[name]}
                        error={this.state.errors[name]}
                        name={name}
                        type={type}
                        className={className}
                        {...field}
                    />
        });
    }
    render() {

        return (
            <div>
                <div className="modal fade" id="update-user-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update User</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onUserUpdate} id="update-user">
        
                                  { this.renderFields() }
                                  
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="update-user"
                                    type="submit"
                                    className="btn btn-primary">
                                    Update User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

UserUpdateModal.propTypes = {
    updateUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateUser }
)(withRouter(UserUpdateModal));
