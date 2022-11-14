import React, {useEffect, useState, useRef} from 'react'
import {  useDispatch } from 'react-redux'
import {PRIVILEGE} from '../../app/util/index.js'
import {updateUser} from '../../app/slice/user'
import {linkUserSiteAsync, unlinkUserSiteAsync} from '../../app/slice/usersites'
import {getAllSitesAsync} from '../../app/slice/sites'
import { getAllSitesByUserAsync } from '../../app/slice/usersites'
import Multiselect from 'multiselect-react-dropdown';
import '../style/edituserform.css'

function EditUserForm({setAddUser, setNewUser, newUser, addUse, user, setEditUser }) {
    console.log("*********edit vard forms**********")
   
    let currentUser = JSON.parse(localStorage.getItem("user"));
    let currentUserSites = JSON.parse(localStorage.getItem("userSites"));

    const dispatch = useDispatch();
    const refFromUseRef = useRef();
    const [allSites , setAllSites] = useState([]);


    useEffect(() => {
        let allA = []
        dispatch(getAllSitesAsync()).then((res) => {
   
            if (parseInt(currentUser.privilege) !== PRIVILEGE.GLOBAL){
                // remove sites from currentUserSites that are in the current user's site list
                const currentSiteLIst = currentUserSites.map((site) => site.site)
           
                const currentUserSiteList = user.sites.map((site) => site)
          
                // remove sites from currentUserSites array that are in the current user's site list
               let  filteredSites= currentSiteLIst.filter((site) => !currentUserSiteList.includes(site))
            

               filteredSites.forEach((site) => {
                allA.push({name: site, id: site})
            })
                setAllSites(allA)

            }
            else {
                const userSites = user.sites.map((site) => site)
          
                const sites = res.payload.filter((site) => !userSites.includes(site.site))
        
                sites.forEach((site) => {
                    allA.push({name: site.display_name, id: site.site})
                })
                setAllSites(allA)

            }
            // remove sites that are already linked to user
            
      
        


        })
    }, [user])


  
    const INITIAL_STATE = {
        username: user.username,
        display_name: user.display_name,
        privilege: user.privilege,
        sites: [],
    }

   
    const [formData, setFormData] = useState(INITIAL_STATE)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)

    //create object with site.id as key and true as value

    const sitesObj = {}
    user.sites.forEach((site) => {
        console.log('site in obj creation', site)

      
            sitesObj[site] = true
    

       
    })

    const [checkedItems, setCheckedItems] = useState(sitesObj);


    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)
        

        console.log('formData', formData)

        dispatch(updateUser(formData))
            .then((res) => {
          
                if (res.payload.name === 'error') {
                    console.log('error in add user form', res.payload)
                    setError(res.payload.detail)
                    setSuccess('User Create Error')
                    setAddUser(false)
                    setNewUser(true)
         
                }
                const uncheckedSites = Object.keys(checkedItems).filter((key) => !checkedItems[key])

                console.log('unchecked sites', uncheckedSites)

                if (uncheckedSites.length > 0) {
                    dispatch(unlinkUserSiteAsync({username: formData.username, site: uncheckedSites})).then((res) => {
                        setSuccess('User unlink successfully')
                    }).catch
                    (err => {
                  
                        setError(err.payload.message)
                    })
                }
                console.log('checked items', formData.sites)
                if (formData.sites.length > 0) {
             
                    handleLink(formData.sites)
                }
               

                
                setLoading(false)
                setSuccess('User created successfully')
                
            })
            .catch((err) => {
                setLoading(false)
                setError(err.message)
            })
        
        refFromUseRef.current.resetSelectedValues();
        setFormData(INITIAL_STATE)
        setEditUser(false)
        setNewUser(true)
        dispatch(getAllSitesByUserAsync(currentUser.username))

        console.log('*************DONE EDITING****************************')
     
        


    }


    function handleLink(site) {

        console.log('site in handle link', site)

        let site_list = []
        site.forEach((site) => {
            site_list.push(site.id)
        })

        dispatch(linkUserSiteAsync({username: formData.username, site: site_list}))
            .then((res) => {
            
                setSuccess('User created successfully')
            })
            .catch((err) => {
        
                setError(err.message)
            })
    }

    function onSelect(selectedList, selectedItem) {
    
    
        setFormData(data => ({
            ...data,
            sites: selectedList
        }))
       }
        function onRemove(selectedList, removedItem) {
 
            setFormData(data => ({
                ...data,
                sites: selectedList
            }))
        }
  

        const handlechechbox = event => {
            setCheckedItems({
              ...checkedItems,
              [event.target.name]: event.target.checked
            });
            
          };
     
    

  return (
    <div className='useradmin-edituser-container'>
   
    <form className='edit-user-form' onSubmit={handleSubmit}>
    <h4 className='form-title'>Edit User</h4>
        <label htmlFor='username'>Username</label>
        <input
            className='form-input'
            disabled = {true}
            id='username'
            name='username'
            type='text'
            value={formData.username}
            onChange={handleChange}
        />
        <label htmlFor='display_name'>Display Name</label>
        <input
        className='form-input'
            id='display_name'
            name='display_name'
            type='text'
            value={formData.display_name}
            onChange={handleChange}
        />
        <label htmlFor='privilege'>Privilege</label>
        <select
        className='form-select'
            id='privilege'
            name='privilege'
            value={formData.privilege}
            onChange={handleChange}
        >
            <option value=''>Select Privilege</option>
            { parseInt(currentUser.privilege) === PRIVILEGE.GLOBAL && <option value={PRIVILEGE.GLOBAL}>Global</option>}
            <option value={PRIVILEGE.SITE}>Site</option>
            <option value={PRIVILEGE.USER}>User</option>
        </select>


            <div className='edit-form-section'> 
                <h5 className='edit-from-section-title'>Websites </h5>

                {user.sites.map((site) => {
                    return <div className='checkbox-cont'>
                        <input className='checkbox-int' type='checkbox' id={site} name={site} checked ={checkedItems[site]} value={site} onChange={handlechechbox} />
                        <label className='checkbox-label' htmlFor={site}>{site}</label>
                    </div>
                })}     

<label htmlFor='sites'>Sites</label>
        <Multiselect
        // selectedValues={formData.sites}
        onSelect={onSelect}
        onRemove={onRemove}
            displayValue="name"
            options={allSites}
            className="basic-multi-select"
            ref={refFromUseRef}
            />
            </div>
        <button className='form-button' type='submit'>Submit</button>
        <button className='form-button-cancel' onClick={() => setEditUser(false)}>Cancel</button>
    </form>
    </div>

  

  )
}

export default EditUserForm