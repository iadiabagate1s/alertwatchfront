import React, {useState} from 'react'
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import {forgotPasswordAsync} from '../app/slice/auth'

import './style/forgotpassword.css'

function ForgotPassword(props) {
const dispatch = useDispatch()
//lOGIN Login form that that username and password
// make api call to backend
// if success, set userobj in redux store
// if fail, show error message
// if success, redirect to landing page

const INITIAL = {
    username: '',
}
const [formData, setFormData] = useState(INITIAL)
const [error , setError] = useState(null)
const [success , setSuccess] = useState(null)

const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(data => ({
        ...data,
        [name]: value
    }))
}

const handleSubmit = (e) => {
    setError(null)
    setSuccess(null)
    e.preventDefault()
    dispatch(forgotPasswordAsync(formData))
    .then((res) => {
        console.log('res-- forgot password', res)
        if(res.error){
            setError(res.payload.message)
        } else {
            setSuccess(res.payload.message)
        }
    }).catch((err) => {
        console.log('err-- forgot password', err)
        setError(err.message)
    })


    // make api call to backend
    // if success, set userobj in redux store
    // if fail, show error message
    // if success, redirect to lognin page
}



return (
<div className='forgot-pswd-cont'>
<h5 className='forgot-pswd-title'>Forgot Password </h5>
<form className='forgot-pswd-form' onSubmit={handleSubmit}>

<label htmlFor="username">Username</label>
<input

    type="text"
    name="username"
    value={formData.username}
    onChange={handleChange}
/>


<button className='submit-button' type='submit' >Submit</button>
{error && <p className='error'>{error}</p>}
{success && <p className='success'>{success}</p>}
</form>








</div>
)
}


export default connect()(ForgotPassword);