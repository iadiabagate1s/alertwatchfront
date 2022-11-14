import React, {useEffect, useState, useRef, createRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {PRIVILEGE,PRIVILEGE_TYPED} from '../../app/util/index.js'
import {createUser} from '../../app/slice/user'
import {getAllSitesAsync, createSiteAsync} from '../../app/slice/sites'
import Multiselect from 'multiselect-react-dropdown';
import '../style/adduserform.css'


function AddSiteForm({setAddSite, setNewSite, newSite, addSite, error, setError, success, setSuccess}) {
    console.log('add site form')

    const {auth, usersites, sites} = useSelector((state) => state);
    let user = JSON.parse(localStorage.getItem("user"));
    let currentUserSites = JSON.parse(localStorage.getItem("userSites"));
    const dispatch = useDispatch();
    const refFromUseRef = useRef();

 
    const INITIAL_STATE = {
        site: '',
        display_name: '',
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
        setError(null)
        setSuccess(null)
        console.log("formData", formData)
        dispatch(createSiteAsync(formData))
            .then((res) => {
                console.log("res", res)
                if (res.payload.name === 'error') {
                    console.log('error in add user form', res.payload)
                    setError(res.payload.detail)
                    setSuccess(null)
                    setAddSite(false)
                    setNewSite(true)
         
                }
               
                setAddSite(false)
                setNewSite(true)
     
            }
            )
            .catch((err) => {
                setError(err.message)
            })

        setFormData(INITIAL_STATE)



    }
   
  return (
    <div className='useradmin-createuser-container'>
 
    <form className='form' onSubmit={handleSubmit}>
        <h5>Add Site</h5>
        <label htmlFor='site'>Website</label>
        <input
            className='form-input'
            id='site'
            name='site'
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
 
   
        <button className='form-button' type='submit'>Submit</button>
        <button className='form-button-cancel' type='button' onClick={() => setAddSite(false)}>Cancel</button>
    </form>
    </div>

  )
}

export default AddSiteForm