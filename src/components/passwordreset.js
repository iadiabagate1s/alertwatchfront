import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import {updatePWD} from '../app/slice/user'
import { useLocation, useNavigate  } from 'react-router-dom'
import { useJwt } from "react-jwt";
import './style/passwordreset.css'


function PasswordReset() {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  let params = new URLSearchParams(location.search)

  let username = params.get('user')
  let token = params.get('token')

  




const INITIAL = {
    username: username,
    password: '',
    token: token,
    error: ''
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
  e.preventDefault()

  dispatch(updatePWD(formData))
  .then((res) => {

      if(res.error){
          setError('Unable to reset password')
      } else {
          setSuccess('Password reset successfully')
          setTimeout(() => {
              navigate('/')
          }
          , 1500)


      }
  }).catch((err) => {

      setError('Unable to reset password')
  }
  )

}




  return (
    <div className='pswd-resit-cont'>
      <h5 className='pswd-reset-title'>Reset Password </h5>
      <form className='pswd-reset-form' onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
        className='pswd-reset-input'
        disabled
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
        className='pswd-reset-input'
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button className='pswd-reset-button'>Reset Password</button>
      </form>

      {error && <p className='error'>{error}</p>}
      {success && <p className='success'>{success}</p>}











    </div>
  )
}

export default PasswordReset