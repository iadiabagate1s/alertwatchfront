import React, { useState} from 'react'
import {useDispatch } from 'react-redux'
import { updateSiteAsync} from '../../app/slice/sites'
import '../style/editsiteform.css'

function EditSiteForm({setAddSite, setNewSite, newSite, addSite, site, setEditSite, error, setError, success, setSuccess}) {
    

const dispatch = useDispatch();

    const INITIAL_STATE = {
        site: site.site,
        display_name: site.display_name,
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
        dispatch(updateSiteAsync(formData))
            .then((res) => {
                console.log('update site res', res)
                if (res.payload.name === 'error') {
                    console.log('error in add user form', res.payload)
                    setError(res.payload.detail)
                    setSuccess('User Create Erro')
                    setAddSite(false)
                    setNewSite(true)
         
                }

                setSuccess('Site updated successfully')
                
            })
            .catch((err) => {
     
                setError(err.payload.detail)
            })
        
        setFormData(INITIAL_STATE)
        setEditSite(false)
        setNewSite(true)


        console.log('*************DONE EDITING****************************')
        // window.location.reload(false);
        


    }



  return (
    <div className='siteadmin-createsite-container'>
   
    <form className='form' onSubmit={handleSubmit}>
        <h5> Edit Site</h5>
        <label htmlFor='site'>Website</label>
        <input
        className='form-input'
            disabled = {true}
            id='site'
            name='site'
            type='text'
            value={formData.site}
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

        <button  className='form-button' type='submit'>Submit</button>
        <button  className='form-button-cancel' onClick={() => setEditSite(false)}>Cancel</button>
    </form>
    </div>

  

  )
}

export default EditSiteForm