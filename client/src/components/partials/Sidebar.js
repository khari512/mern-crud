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
                                <Link to="/" className="nav-link">Schedule An EB</Link>
                                <Link to="/" className="nav-link">Scheduled EB List</Link>
                            </nav>
                            <a className="nav-link collapsed" href="#fileManager" data-toggle="collapse" onClick={ expandMenu }>
                                File Manager 
                                <i 
                                    className={classnames("fas", {
                                        'fa-chevron-down' : menuName === "#fileManager",
                                        'fa-chevron-right' : menuName !== "#fileManager"
                                    })}
                                ></i>
                            </a>
                            <nav className={
                                classnames("nav nav-pills flex-column", {
                                    'collapse' : menuName !== "#fileManager"
                                })} 
                                id="fileManager">
                                <Link to="/eb-list" className="nav-link" >Send File To IFA</Link>
                                <Link to="/eb-due-list" className="nav-link">Receive File From IFA</Link>
                                <Link to="/consolidated-eb-list" className="nav-link">Resend File To IFA</Link>
                                <Link to="/" className="nav-link">Pending File List At IFA</Link>
                                <Link to="/" className="nav-link">Concurred File List</Link>
                            </nav>
                            <a className="nav-link collapsed" href="#projectManager" data-toggle="collapse" onClick={ expandMenu }>
                                Project Manager 
                                <i 
                                    className={classnames("fas", {
                                        'fa-chevron-down' : menuName === "#projectManager",
                                        'fa-chevron-right' : menuName !== "#projectManager"
                                    })}
                                ></i>
                            </a>
                            <nav className={
                                classnames("nav nav-pills flex-column", {
                                    'collapse' : menuName !== "#projectManager"
                                })} 
                                id="projectManager">
                                <Link to="/eb-list" className="nav-link" >Add New Sanctioned Project</Link>
                                <Link to="/eb-due-list" className="nav-link">View Ongoing Project List</Link>
                                <Link to="/consolidated-eb-list" className="nav-link">Add Amendment</Link>
                                <Link to="/" className="nav-link">View Project Details With Amendments</Link>
                                <Link to="/" className="nav-link">Add New Project Proposal</Link>
                                <Link to="/" className="nav-link">Change Status Of New Project Proposal</Link>
                                <Link to="/" className="nav-link">CCM Cleared But Due For DMC </Link>
                                <Link to="/" className="nav-link">Projects To Be Represented In CCM </Link>
                                <Link to="/" className="nav-link">DMC Cleared But Due For Sanction </Link>
                                <Link to="/" className="nav-link">Projects To Be Represented In DMC</Link>
                                <Link to="/" className="nav-link">List Of New Projects In Pipeline </Link>
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
