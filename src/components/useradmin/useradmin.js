import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {PRIVILEGE,PRIVILEGE_TYPED} from '../../app/util/index.js'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllUsersAndSitesAsync, getAllSitesByUserAsync } from '../../app/slice/usersites'
import {deleteUser} from '../../app/slice/user'
import '../style/useradmin.css'
import AddUserForm from './addUserForm.js'
import EditUserForm from './editUserForm.js'

function UserAdmin(props) {

  const {auth, usersites, sites} = useSelector((state) => state);
  let user = JSON.parse(localStorage.getItem("user"));
  let currentUserSites = JSON.parse(localStorage.getItem("userSites"));
  const Wholestate = useSelector((state) => state);
  const [addUser , setAddUser] = useState(false)
  const [newUser, setNewUser] = useState(false)
  const [editUser , setEditUser] = useState(false)
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();



 
  useEffect(() => {
    if (parseInt(user.privilege) !== PRIVILEGE.GLOBAL && parseInt(user.privilege) !== PRIVILEGE.SITE) {
      navigate('/landing')
    }
 
    
    dispatch(getAllSitesByUserAsync(user.username)).then((result) => {
    

      dispatch(getAllUsersAndSitesAsync()).then((res) => {
    
        
    
  
        if (parseInt(user.privilege) !== PRIVILEGE.GLOBAL) {
          // filter out users that are not in the same site as the current user
     
          const userlist = res.payload 
          const currentSiteLIst = result.payload.map((site) => site.site)
          let filteredUsers = []
          // create list of users who have sites in common with the current user
          userlist.forEach((user) => {
            const userSites = user.sites.map((site) => site.site)
         
            const commonSites = userSites.filter((site) => currentSiteLIst.includes(site))
            
          
            // replace user.sites with commonSites
      
            user = {...user, sites: commonSites}
         
            
          
            if (commonSites.length > 0) {
              filteredUsers.push(user)
            }
          })
  
  
  
  
    
          setUserList(filteredUsers);
          
        }
        else {
          // convert res.payload.sites to an array of strings
          const userlist = res.payload.map((user) => {
            const userSites = user.sites.map((site) => site.site)
            user = {...user, sites: userSites}
            return user
          })
      
          setUserList(userlist);
        }
        
    
      });
    





    })




    setNewUser(false)

  }, [newUser, addUser])


function handleEditUser(user) {

  setEditUser(user)
  setAddUser(false)
}
function handleAddUser() {
  setAddUser(true)
  setEditUser(false)
}
function handleDeleteUser(user) {
  
  dispatch(deleteUser(user.username))
  setNewUser(true)

}

function cantEditGlobalUser(currentUser, user_list) {

  if (parseInt(currentUser.privilege) !==  PRIVILEGE.GLOBAL && parseInt(user_list.privilege) === PRIVILEGE.GLOBAL || currentUser.username === user_list.username) {

    return (  
    <>
    <button className='td-action' onClick={()=> handleEditUser(user_list)} disabled={true}>Edit</button>
    <button className='td-action' onClick={() => handleDeleteUser(user_list)} disabled={true} >Delete</button>
    </>
    )
  }
  else {
    return(
      <>
    <button className='td-action' onClick={()=> handleEditUser(user_list)} disabled={editUser || addUser}>Edit</button>
    <button className='td-action' onClick={() => handleDeleteUser(user_list)} disabled={editUser || addUser} >Delete</button>
    </>
    )

  }

}


  return (
    <div className='useradmin-table-container'>
      <h5>User Admin</h5>
      <button className='add-user-button' onClick={()=> handleAddUser()}>Add User</button>
      <table className='useradmin-table'>
        <thead className='useradmin-thead'>
          <tr className='useradmin-tr'>
            <th className='useradmin-th'>Username</th>
            <th className='useradmin-th'>Display Name</th>
            <th className='useradmin-th'>Privilege</th>
            <th className='useradmin-th'>Sites</th>
            <th className='useradmin-th'>Actions</th>
          </tr>
        </thead>
        <tbody className='useradmin-tbody'>
          {userList.map((u, idx) => {
         
            return (
              <tr key={idx} className='useradmin-tr' >
                <td className='useradmin-td'>{u.username}</td>
                <td className='useradmin-td'>{u.display_name}</td>
                <td className='useradmin-td'>{PRIVILEGE_TYPED[u.privilege]}</td>
                <td className='useradmin-td' id='badhe-td'>
                  {u.sites.map((site, idx2) => {
                   
                      return (
                        <span key={idx2} className='useradmin-site-badge'>{site}</span>
                      )
                      
                    }
                  )}
                </td>
                <td className='useradmin-td' id='useradmin-td-action-button'>
                  {cantEditGlobalUser(user, u)}
                  
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      

      {addUser && <AddUserForm error={error} setError={setError} success={success} setSuccess={setSuccess} setAddUser={setAddUser} setNewUser={setNewUser} newUser={newUser} addUser={addUser} />}
      {editUser && <EditUserForm error={error} setError={setError} success={success} setSuccess={setSuccess} setAddUser={setAddUser} setNewUser={setNewUser} newUser={newUser} addUser={addUser} user={editUser} setEditUser={setEditUser} />}

      <div> 
      {error && <p className='error'>{error}</p>}
      {success && <p className='success'>{success}</p>}



      </div>


    </div>
  )
}

export default connect()(UserAdmin);