import toast from "react-hot-toast";

export async function LoginValidate(values) {
  const error = {};
  userNameVerify(error, values);
  passwordVerify(error, values);
  return error;
}

export async function registerValidate(values) {
  const error = {};
  userNameVerify(error, values);
  firstNameVerify(error, values);
  lastNameVerify(error, values);
  passwordVerify(error, values);
  confirmPasswordVerify(error, values);
  return error;
}

export async function forgotPasswordValidate(values) {
  const error = {};
  userNameVerify(error, values);
  passwordVerify(error, values);
  confirmPasswordVerify(error, values);
  otpVerify(error, values);
  return error;
}

function passwordVerify(errors = {}, values) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{}:"'<>.,\/?~]/;
  const hasNumber = /\d/;
  const hasUpper = /[A-Z]/;
  const hasLower = /[a-z]/;
  if (!values.password) {
    errors.password = toast.error("Password Required");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Invalid Password");
  } else if (values.password.length < 8) {
    errors.password = toast.error("Password must be at least 8 characters");
  } else if (!hasNumber.test(values.password)) {
    errors.password = toast.error("Password must contain at least one number");
  } else if (!hasUpper.test(values.password)) {
    errors.password = toast.error("Password must contain at least one uppercase letter");
  } else if (!hasLower.test(values.password)) {
    errors.password = toast.error("Password must contain at least one lowercase letter");
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error("Password must contain at least one special character");
  }
  return errors;
}

function firstNameVerify(errors = {}, values) {
  if (!values.firstName) {
    errors.firstName = toast.error("First Name Required");
  }
  return errors;
}

function lastNameVerify(errors = {}, values) {
  if (!values.lastName) {
    errors.lastName = toast.error("Last Name Required");
  }
  return errors;
}

function userNameVerify(errors = {}, values) {
  if (!values.userName) {
    errors.userName = toast.error("Username Required");
  } else if (values.userName.includes(" ")) {
    errors.userName = toast.error("Username already Exists");
  } else if (!/[.]/.test(values.userName) || !/[@]/.test(values.userName)) {
    errors.userName = toast.error("Invalid Username");
  }

  return errors;
}

function confirmPasswordVerify(errors = {}, values) {
  if (!values.confirmPassword) {
    errors.confirmPassword = toast.error("Confirm Password Required");
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = toast.error("Both passwords do not match");
  }

  return errors;
}

function otpVerify(errors = {}, values) {
  if (!values.otp) {
    errors.otp = toast.error("OTP Required");
  } else if (values.otp.includes(" ")) {
    errors.otp = toast.error("Invalid OTP");
  }

  return errors;
}
