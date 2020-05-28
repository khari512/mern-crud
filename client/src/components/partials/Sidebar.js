import React, { useState } from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import {Link, useHistory} from "react-router-dom";
import classnames from "classnames";


const Sidebar = ( props ) => {

    const [menuName, setMenuName ] = useState('');

    const onLogoutClick = e => {
        e.preventDefault();
        props && props.logoutUser();
    };

    const expandMenu = (e)=> {
        const classNames= e.target.className;
        console.dir(e.target.hash)
        if( !classNames.includes("collapsed")){
            setMenuName(e.target.hash);
        }else{
            setMenuName('');
        }
        
    }

    return (
        <div className="border-right h-100" id="sidebar-wrapper">
                <div className="list-group list-group-flush">
                    <nav id="navbar-example3" className="navbar navbar-light bg-light">
                
                        <nav className="nav nav-pills flex-column">
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            <Link to="/users" className="nav-link">Users</Link>
                            <a className="nav-link collapsed" href="#ebManager" data-toggle="collapse" onClick={ expandMenu }>
                                EB Manager 
                                <i 
                                    className={classnames("fas", {
                                        'fa-chevron-down' : menuName === "#ebManager",
                                        'fa-chevron-right' : menuName !== "#ebManager"
                                    })}
                                ></i>
                            </a>
                            <nav className={
                                classnames("nav nav-pills flex-column", {
                                    'collapse' : menuName !== "#ebManager"
                                })} 
                                id="ebManager">
                                <Link to="/eb-list" className="nav-link" >Add EB Entry</Link>
                                <Link to="/eb-due-list" className="nav-link">EB Due List</Link>
                                <Link to="/consolidated-eb-list" className="nav-link">Consolidated EB List</Link>
                            </nav>
                            <a href="#" className="nav-link" onClick={onLogoutClick}>Logout <FontAwesomeIcon icon={faSignOutAlt} /></a>
                            
                        </nav>
                    </nav>
                </div>
        </div>
    );
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
