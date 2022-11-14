import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {PRIVILEGE} from '../app/util/index.js'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllSitesByUserAsync } from '../app/slice/usersites'
import { getUser} from '../app/slice/user'
import './style/landing.css'
import ElementMaker from './elementMaker.js'
import {updateUser} from '../app/slice/user.js'


function Landing(props) {
  let userLocate = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
 

  useEffect(() => {
    dispatch(getUser(userLocate.username))
    dispatch(getAllSitesByUserAsync(userLocate.username))

  }, [])
const {auth, usersites, sites, user} = useSelector((state) => state);

const userSites = () => {
  if (usersites.currentUserSites.length > 0 ){
    return usersites.currentUserSites.map((site,idx) => {
    
   // return card with site info
   return (
    <a key={site.site} className='site-link-card' href={site.site}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{site.site_display_name}</h5>
          <h6 className="card-subtitle mb-2 text-muted"><a className='site-link' href={site.site}>{site.site}</a></h6>
        </div>
      </div>
      </a>
    )
    })

  }
  else {
    return (
      <div>
        <p>No sites</p>
      </div>
    )
  }
}


  const [displayName, setDisplayName] = useState(userLocate.display_name);
  const [showInputEle, setShowInputEle] = useState(false);

  function handleSave(e){
    setShowInputEle(false);
   
    dispatch(updateUser({username: userLocate.username ,display_name: displayName, privilege : userLocate.privilege}))
    .then((res) => {

      localStorage.setItem("user", JSON.stringify(res.payload[0]));
      setDisplayName(res.payload[0].display_name)
    }
    )



  }
  return (
    <>
    <h4 className='title'>Welcome</h4>
    <div className='landing-container'>
      


        <div className='userinfo-container'>
          <h5 className='userinfo-title'>User Info</h5>
          
        
          <ElementMaker
          value={displayName}
          handleChange={(e) => setDisplayName(e.target.value)}  
          handleDoubleClick={() => setShowInputEle(true)} 
          handleBlur={() => handleSave()}         
          showInputEle={showInputEle}
        />

          <h6>Username: {userLocate.username}</h6>


        </div>
        <div className='sites-container'>
          {userSites()}

          </div>
     


    </div>
    </>
  )
}

export default connect()(Landing);