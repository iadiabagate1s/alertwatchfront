import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {PRIVILEGE} from '../../app/util/index.js'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllSitesAsync,deleteSiteAsync } from '../../app/slice/sites'
import AddSiteForm from './addSiteForm.js'
import EditSiteForm from './editSiteForm.js'
function SiteAdmin(props) {
  const {auth, usersites, sites, user} = useSelector((state) => state);
  let currentUserSites = JSON.parse(localStorage.getItem("userSites"));
  let currentUser = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [listSites, setListSites] = useState([]);
  const [addSite, setAddSite] = useState(false);
  const [editSite, setEditSite] = useState(false);
  const [newSite , setNewSite] = useState(false);
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

 


 


  useEffect(() => {
    if (parseInt(currentUser.privilege) !== PRIVILEGE.GLOBAL && parseInt(currentUser.privilege) !== PRIVILEGE.SITE) {
      navigate('/landing')
    }
 
   
    dispatch(getAllSitesAsync()).then((res) => {

  



        // if user is not admin only show sites that the user is in
    if (parseInt(currentUser.privilege) !== PRIVILEGE.GLOBAL) {
      const currentSiteLIst = currentUserSites.map((site) => site.site)
      let filteredSites = []
      res.payload.forEach((site) => {
        if (currentSiteLIst.includes(site.site)) {
          filteredSites.push(site)
        }
      }
      )
   
      setListSites(filteredSites)

    }
    else {
      setListSites(res.payload)

    }
    })
    setNewSite(false)
    

  
  }, [newSite, addSite, editSite])


function handleEditUser(user) {

  setEditSite(user)
  setAddSite(false)
}
function handleAddSite() {
  setAddSite(true)
  setEditSite(false)
}
function handleDeleteSite(site) {
  

  dispatch(deleteSiteAsync(site.site))
  setNewSite(true)

}


  return (
    <div>
        

        <div className='useradmin-table-container'>
        <h5>SiteAdmin </h5>
        {parseInt(currentUser.privilege) === PRIVILEGE.GLOBAL && <button className='add-user-button' onClick={()=> handleAddSite()}>Add Site</button>}
      <table className='useradmin-table'>
        <thead className='useradmin-thead'>
          <tr className='useradmin-tr'>
            <th className='useradmin-th'>Site</th>
            <th className='useradmin-th'>Display Name</th>
            <th className='useradmin-th'>Actions</th>
          </tr>
        </thead>
        <tbody className='useradmin-tbody'>
          {listSites.map((s,idx) => {
         
            return (
              <tr key={idx} className='useradmin-tr' >
                <td className='useradmin-td'>{s.site}</td>
                <td className='useradmin-td'>{s.display_name}</td>
                <td className='useradmin-td'>
                <button className='td-action' onClick={()=> handleEditUser(s)} disabled={editSite || addSite}>Edit</button>
                {parseInt(currentUser.privilege) === PRIVILEGE.GLOBAL && <button className='td-action' onClick={() => handleDeleteSite(s)} disabled={editSite || addSite} >Delete</button>}
                
                  
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

    

      

      {addSite && <AddSiteForm error={error} setError={setError} success={success} setSuccess={setSuccess} setAddSite={setAddSite} setNewSite={setNewSite} newSite={newSite} addSite={addSite} />}
      {editSite && <EditSiteForm error={error} setError={setError} success={success} setSuccess={setSuccess} setAddSite={setAddSite} setNewSite={setNewSite} newSite={newSite} addSite={addSite} site={editSite} setEditSite={setEditSite} />} 




    </div>
    {error && <p className='error'>{error}</p>}
    {success && <p className='success'>{success}</p>}

     
              


        

    </div>
  )
}

export default connect()(SiteAdmin);