import React, { useState } from "react";
import { Link } from "react-router-dom";
import './style/sidebar.css'
import { useSelector, useDispatch } from 'react-redux'
import {PRIVILEGE} from '../app/util/index.js'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import fabars and fa-times-circle from fontawesome
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimesCircle } from '@fortawesome/free-solid-svg-icons'


const Sidebar = (props) => {
  const location = useLocation()
  const [isNotActive, setNotActive] = useState("true");
  const [isDropdownActive, setDropdownActive] = useState("false");
  const naviagte = useNavigate()

  if (location.pathname === '/' || location.pathname === '/forgotpassword' || location.pathname === '/passwordreset') {
    return null
  }
  else {

  var barsIcon =  <FontAwesomeIcon icon={faBars} />
  var crossIcon =  <FontAwesomeIcon icon={faTimesCircle} />

 


  
  const stateAuth = JSON.parse(localStorage.getItem("user"));


  function permissionCheck() {

    if (stateAuth && stateAuth) {
   
    
    if (parseInt(stateAuth.privilege) === PRIVILEGE.GLOBAL || parseInt(stateAuth.privilege) === PRIVILEGE.SITE) {

        return (
            <>
            <li className="list-item">
            <i className="fas fa-building icon-color"></i>
            <Link to="/useradmin">User Admin</Link>
          </li>
          <li className="list-item">
            <i className="fas fa-building icon-color"></i>
            <Link to="/siteadmin">Site Admin</Link>
          </li>
          </>
        )}
        }
        else {
            return null
        }
  }


  const handleLogoff = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userSites");
    naviagte('/')
    
  }

 

 
  return (
    <div>
      <div className="wrapper">
        <nav id="sidebar" className={isNotActive ? "active" : ""}>
          <button
            type="button"
            id="sidebarCollapse"
            onClick={() => setNotActive(!isNotActive)}
            className="btn btn-custom"
          >
            <span className={ isNotActive ? '' : 'hidden' }>{ barsIcon }</span>
            <span className={ isNotActive ? 'hidden' : '' }>{ crossIcon }</span>
          </button>
          <div className="sidebar-header">
            {/* <h3>{stateAuth.user.data.display_name}</h3> */}
            <button onClick={() => handleLogoff()}> Logout </button>
          </div>

          <ul className="list-unstyled components">
            <li className="list-item">
              <i className="fas fa-briefcase icon-color"></i>
              <Link to="/landing">User Info</Link>
            </li>
            {permissionCheck()}
          
            
       
           
          </ul>
        </nav>
      </div>
    </div>
  );
  }
};
export default Sidebar;