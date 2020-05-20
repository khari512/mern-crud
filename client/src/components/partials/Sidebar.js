import React, { Component } from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import {Link} from "react-router-dom";

class Sidebar extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        //const { user } = this.props.auth;
        return (
            <div className="border-right h-100" id="sidebar-wrapper">
                <div className="list-group list-group-flush">
                    <Link to="/dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
                    <Link to="/users" className="list-group-item list-group-item-action">Users</Link>
                    <Link to="/eb-list" className="list-group-item list-group-item-action">EB Entry</Link>
                    <Link to="/eb-due-list" className="list-group-item list-group-item-action">EB Due List</Link>
                    <Link to="/events" className="list-group-item list-group-item-action">Events</Link>
                    <button className="list-group-item list-group-item-action" onClick={this.onLogoutClick}>Logout <FontAwesomeIcon icon={faSignOutAlt} /></button>
                </div>
                {/* <nav id="navbar-example3" class="navbar navbar-light bg-light">
                    
                        <nav class="nav nav-pills flex-column">
                            <a class="nav-link" href="#item-1">EB Manager</a>
                            <nav class="nav nav-pills flex-column">
                                <a class="nav-link ml-3 my-1" href="#item-1-1">Add EB Entry</a>
                                <a class="nav-link ml-3 my-1" href="#item-1-2">EB Due List</a>
                                <Link to="/eb-due-list" className="nav-link ml-3 my-1">EB Due List</Link>
                            </nav>
                            <a class="nav-link" href="#item-2">Item 2</a>
                            <a class="nav-link" href="#item-3">Item 3</a>
                            <nav class="nav nav-pills flex-column">
                                <a class="nav-link ml-3 my-1" href="#item-3-1">Item 3-1</a>
                                <a class="nav-link ml-3 my-1" href="#item-3-2">Item 3-2</a>
                            </nav>
                        </nav>
                    </nav>
                
                    <div id="list-example" class="list-group">
                        <a class="list-group-item list-group-item-action" href="#list-item-1">Item 1</a>
                        <div id="list-example" class="list-group">
                            <a class="list-group-item list-group-item-action" href="#list-item-1">Item 1</a>
                            <a class="list-group-item list-group-item-action" href="#list-item-2">Item 2</a>
                            <a class="list-group-item list-group-item-action" href="#list-item-3">Item 3</a>
                            <a class="list-group-item list-group-item-action" href="#list-item-4">Item 4</a>
                        </div>
                        <a class="list-group-item list-group-item-action" href="#list-item-2">Item 2</a>
                        <a class="list-group-item list-group-item-action" href="#list-item-3">Item 3</a>
                        <a class="list-group-item list-group-item-action" href="#list-item-4">Item 4</a>
                    </div> */}


            </div>
        );
    }
}

Sidebar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Sidebar);
