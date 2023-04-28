import React, { useState } from 'react';
import '../css/Login.css';
import { useNavigate , Link } from "react-router-dom";
import toast,{Toaster} from "react-hot-toast"
import { useFormik } from 'formik';
import {LoginValidate} from "../helper/validate"
import { verifyPassword } from '../helper/helper'
function Login() {

  const navigate = useNavigate()
  const formik = useFormik({
    initialValues : {
      userName : "",
      password : "",
    },
     validate :LoginValidate,
     validateOnBlur:false,
     validateOnChange:false,
     onSubmit:async values =>{

      let loginPromise = verifyPassword({ userName:values.userName, password:values.password })
      toast.promise(loginPromise, {
        loading: 'Checking...',
        success : <b>Login Successfully...!</b>,
        error : <b>Password Not Match!</b>
      });

      loginPromise.then(res => {
        let { token,userId } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', userId);
        navigate('/chatify')
      })

     }
  })
  
  return (
    
 <form action='POST'  onSubmit={formik.handleSubmit}>
   <Toaster position='top-center' reverseOrder={false}></Toaster>
  <div className='d-flex flex-column content-login d-flex justify-content-center  align-items-center'>
        <input {...formik.getFieldProps("userName")} className='mt-3 w-100' placeholder='Username' type="text" />
        <input {...formik.getFieldProps("password")} className='mt-3 w-100' placeholder='Password'  type="password"/>
      <button className='btn btn-primary fw-bold mt-3 w-100' type="submit">Login</button>
      <Link to="/Resetpassword" className='mt-3'>  
      <div className='d-flex align-items-center fw-bold pb-2 text-dark text-decoration-none'>Forgot password ?</div> </Link> 
      <Link to="/Signup">
        <button className='btn btn-success fw-bold w-auto mb-3 mt-3'> Create new account </button>
      </Link>
    </div>
    </form>


  );


}

export default Login;
