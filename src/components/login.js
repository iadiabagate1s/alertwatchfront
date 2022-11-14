import React, {useState} from 'react'
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { loginAsync } from '../app/slice/auth'
import { getAllSitesByUserAsync } from '../app/slice/usersites'
import { useNavigate } from 'react-router-dom'
import './style/login.css'


function Login(props) {
    const naviagte = useNavigate()

const state = useSelector((state) => state.auth);
const dispatch = useDispatch();
const INITIAL = {
    username: '',
    password: '',
    error: ''
}

const [formData, setFormData] = useState(INITIAL)

const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(data => ({
        ...data,
        [name]: value
    }))
}

const handleSubmit = (e) => {
    e.preventDefault()
 
    dispatch(loginAsync(formData))
    .then((res) => {
        // set uer to local storage
        localStorage.setItem('user', JSON.stringify(res.payload.data));
       
        if(res.payload.error){
            setFormData(data => ({
                ...data,
                error: res.payload
            }))
        } else {
            //get all sites by user api
            dispatch(getAllSitesByUserAsync(res.payload.data.username)).then
            (res => {
                // set user sites to local storage
                localStorage.setItem('userSites', JSON.stringify(res.payload))

            })
            naviagte('/landing')
        }
    }
    )
  
}


return (
<div className='login-background'>
<div className='login-container'>
<h1 className='login-title'>Login</h1>



<form className='login-form' onSubmit={handleSubmit}>

<label className='login-input-label' htmlFor="username">Username</label>
<input
className='login-input'
    type="text"
    placeholder='enter username'
    name="username"
    value={formData.username}
    onChange={handleChange}
/>

<label className='login-input-label' htmlFor="password">Password</label>
<input
    className='login-input'
    placeholder='enter password'
    type="password"
    name="password"
    value={formData.password}
    onChange={handleChange}
/>

<button className='login-button' type='submit' >Submit</button>
</form>
{state.error && <p className='error'>{state.error.message}</p>}
<a href='/forgotpassword'>Forgot Pasword?</a>



</div>
</div>
)
}


export default connect()(Login);