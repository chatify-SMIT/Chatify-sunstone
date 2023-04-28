import React, { useState } from 'react';
import { useNavigate , Link } from "react-router-dom";
import toast,{Toaster} from "react-hot-toast"
import { useFormik } from 'formik';
import {registerValidate} from "../helper/validate"
import { registerUser } from '../helper/helper'


function SignUp() {
  const navigate = useNavigate()
 
const formik = useFormik({
  initialValues : {
    userName : "",
    firstName : "",
    lastName : "",
    password : "",
    confirmPassword : ""

  },
   validate :registerValidate,
   validateOnBlur:false,
   validateOnChange:false,
   onSubmit:async values =>{
    let registerPromise = registerUser(values)
    toast.promise(registerPromise, {
      loading: 'Creating...',
      success : <b>Register Successfully...!</b>,
      error : <b>Could not Register.</b>
    });

    registerPromise.then(function(){ navigate('/')});
   }
})

  return (
    <form  onSubmit={formik.handleSubmit}>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
    <div className='d-flex flex-column content-login d-flex justify-content-center  align-items-center'>
          
          <input {...formik.getFieldProps("firstName")} className='mt-3 w-100' placeholder='First Name' type="text"  />
          <input {...formik.getFieldProps("lastName")} className='mt-3 w-100' placeholder='Last Name' type="text" />
          <input {...formik.getFieldProps("userName")} className='mt-3 w-100' placeholder='Phone Number or Email id' type="text"  />
          <input {...formik.getFieldProps("password")} className='mt-3 w-100' placeholder='Password'  type="password" />
          <input {...formik.getFieldProps("confirmPassword")} className='mt-3 w-100' placeholder='Confirm Password'  type="password" />
          <button className='btn btn-success fw-bold w-auto w-100 px-3 mb-3 mt-3'> Sign up </button>
          <Link to="/">  <div className='d-flex align-items-center fw-bold pb-2 text-dark text-decoration-none'>Already a User ? Log in
          </div> </Link> 
          </div>
      </form>
  );
}
 


export default SignUp; 
