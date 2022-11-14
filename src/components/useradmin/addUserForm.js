import React, {useEffect, useState, useRef, createRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {PRIVILEGE,PRIVILEGE_TYPED} from '../../app/util/index.js'
import {createUser} from '../../app/slice/user'
import {getAllSitesByUserAsync} from '../../app/slice/usersites'
import {linkUserSiteAsync, unlinkUserSiteAsync} from '../../app/slice/usersites'
import {getAllSitesAsync} from '../../app/slice/sites'
import Multiselect from 'multiselect-react-dropdown';
import '../style/adduserform.css'


function AddUserForm({setAddUser, setNewUser, newUser, addUser, error, setError, success, setSuccess}) {


    const {auth, usersites, sites} = useSelector((state) => state);
    let user = JSON.parse(localStorage.getItem("user"));
    let currentUserSites = JSON.parse(localStorage.getItem("userSites"));
    const dispatch = useDispatch();
    const refFromUseRef = useRef();

 
    const [allSites , setAllSites] = useState([]);

    useEffect(() => {
        let allA = []
        if (parseInt(user.privilege) === PRIVILEGE.SITE) {

            const currentSiteLIst = currentUserSites.map((site) => site.site)
        
            currentSiteLIst.forEach((site) => {
            allA.push({name: site, id: site})
        })
            setAllSites(allA)
            
        }
        if (parseInt(user.privilege) === PRIVILEGE.GLOBAL) {
           
            dispatch(getAllSitesAsync()).then((res) => {
    
                res.payload.forEach((site) => {
                    allA.push({id: site.site, name: site.display_name})
                })
                setAllSites(allA)
            })
        }


    }, [])


    const INITIAL_STATE = {
        username: '',
        password: '',
        display_name: '',
        privilege: '',
        sites: []
    }
    const [formData, setFormData] = useState(INITIAL_STATE)

 

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        if (formData.sites.length === 0) {
            setError("Please select at least one site")
            return
        }

        setError(null)
        setSuccess(null)
        dispatch(createUser(formData))
            .then((res) => {
                console.log('res in add user form', res)
                if (res.payload.name === 'error') {
                    console.log('error in add user form', res.payload)
                    setError('Error creating user')
                    setSuccess(null)
                    setAddUser(false)
                    setNewUser(true)
         
                }


                if (formData.sites.length > 0) {

                let list_sites = formData.sites.map((site) => {
                    return site.id
                })

                dispatch(linkUserSiteAsync({username: formData.username, site: list_sites})).then((res) => {
                    setSuccess('User created successfully')
                   
                }).catch
                (err => {
      
                    setError(err.payload.message)
                })
       
             
                
     
            }
           
            setAddUser(false)
            setNewUser(true)
            
            })
            .catch((err) => {
          
                setError(err.message)
            })

        refFromUseRef.current.resetSelectedValues();
        setFormData(INITIAL_STATE)
        // setNewUser(true)
        // setAddUser(false)
        

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
function onCancel() {
    setAddUser(false)
    setError(null)
    setSuccess(null)
}
   





  return (
    <div className='useradmin-createuser-container'>
    
    <form className='form' onSubmit={handleSubmit}>
    <h4>Add User</h4>
        <label htmlFor='username'>Username</label>
        <input
            className='form-input'
            id='username'
            name='username'
            type='text'
            required
            value={formData.username}
            onChange={handleChange}
        />
        <label htmlFor='password'>Password</label>
        <input
        className='form-input'
            id='password'
            name='password'
            type='password'
            required
            value={formData.password}
            onChange={handleChange}
        />
        <label htmlFor='display_name'>Display Name</label>
        <input
        className='form-input'
            id='display_name'
            name='display_name'
            type='text'
            required
            value={formData.display_name}
            onChange={handleChange}
        />
        <label htmlFor='privilege'>Privilege</label>
        <select
        required
        className='form-input-select'
            id='privilege'
            name='privilege'
            value={formData.privilege}
            onChange={handleChange}
        >
            <option value=''>Select Privilege</option>
            { parseInt(user.privilege) === PRIVILEGE.GLOBAL && <option value={PRIVILEGE.GLOBAL}>Global</option>}
            
            <option value={PRIVILEGE.SITE}>Site</option>
            <option value={PRIVILEGE.USER}>User</option>
        </select>
        <label htmlFor='sites'>Sites</label>
        <Multiselect
        onSelect={onSelect}
        onRemove={onRemove}
            displayValue="name"
            options={allSites}
            className="basic-multi-select"
            ref={refFromUseRef}
            />
        {error && <p style={{color:'red'}} className='error-multi-select'>{error}</p>}
        <button className='form-button' type='submit'>Submit</button>
        <button className='form-button-cancel' type='button' onClick={() => onCancel()}>Cancel</button>
    </form>
    
    </div>

  )
}

export default AddUserForm