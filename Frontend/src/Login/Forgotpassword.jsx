import React, { useState, useEffect } from 'react';
import '../css/Login.css';
import { useNavigate, Link } from "react-router-dom";
import toast,{Toaster} from "react-hot-toast"
import { useFormik } from 'formik';
import { forgotPasswordValidate } from "../helper/validate";
import { generateOTP, verifyOTP, resetPassword } from '../helper/helper';

function Forgotpassword() {
  const [disabled, setDisabled] = useState(false);

  const [remainingTime, setRemainingTime] = useState(60);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: "",
      otp: "",
      password: "",
      confirmPassword: ""
    },
    validate: forgotPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        let { status, data } = await verifyOTP({ userName: values.userName, code: values.otp })
        if (status === 201) {
          let resetPromise = resetPassword({ userName: values.userName, password: values.password })

          toast.promise(resetPromise, {
            loading: 'Updating...',
            success: <b>{data.msg}</b>,
            error: <b>{data.error || 'Could not reset password!'}</b>
          });

          resetPromise.then(function () { navigate('/') })
        }
        
      } catch (error) {
        return toast.error('Wrong OTP! Please check your email and try again.')
      }
    }
  })

  useEffect(() => {
    let timerId;
    if (disabled) {
      timerId = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev === 0) {
            clearInterval(timerId);
            setDisabled(false);
            return 60;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [disabled]);

  const handleOTPClick = () => {
    if (!disabled) {
      setDisabled(true);
      let sentPromise = generateOTP(formik.values.userName);

      toast.promise(sentPromise,
        {
          loading: 'Sending...',
          success: <b>OTP has been sent to your email!</b>,
          error: <b>Could not send it!</b>,
        }
      );

    } else {
      setDisabled(false);
      setRemainingTime(60);
    }
  };

  const buttonText = disabled ? `${remainingTime}` : 'OTP';


  return (
 <form  onSubmit={formik.handleSubmit}>
     <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='d-flex flex-column content-login d-flex justify-content-center  align-items-center'>
        <input {...formik.getFieldProps("userName")} className='mt-3 w-100' placeholder='Username' type="text" />
        <div className='d-flex flex-row justify-content-start w-100'> 
        <input {...formik.getFieldProps("otp")}  className='mt-3 w-75' placeholder='Enter OTP' type="text" />
         <button  className='btn  btn-primary fw-bold mt-3 w-25 mx-2 otp' type="button"  onClick={handleOTPClick} disabled={disabled}>{buttonText}</button></div>
         <input {...formik.getFieldProps("password")} className='mt-3 w-100' placeholder='Password'  type="password"  />
        <input {...formik.getFieldProps("confirmPassword")} className='mt-3 w-100' placeholder='Confirm Password'  type="password"  />
        <button className='btn btn-primary fw-bold mt-3 w-100' type="submit">Reset Password</button>
        <Link to="/">  <div className='d-flex align-items-center fw-bold pb-2 mt-3 text-dark text-decoration-none'>Return to Log in
          </div> </Link> 
    </div>
    </form>

  );
}

export default Forgotpassword;