import axios from 'axios';
import jwt_decode from 'jwt-decode';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

console.log(process.env.REACT_APP_API_URL)
/** Make API Requests */


/** To get username from Token */
export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwt_decode(token)
    return decode;
}

/** authenticate function */
export async function authenticate(userName){
    try {
        return await axios.post('/api/authenticate', { userName })
    } catch (error) {
        return { error : "Username doesn't exist...!"}
    }
}

/** get User details */
export async function getUser({ userName }){
    try {
        const { data } = await axios.get(`/api/user/${userName}`);
        return { data };
    } catch (error) {
        return { error : "user not found"}
    }
}


export async function getUserData({ _id }) {
    try {
      const { data } = await axios.get('/api/userData', { params: { _id } });
      return { data };
    } catch (error) {
      return { error: 'user not found' };
    }
  }
  

/** register user function */
export async function registerUser(credentials){
    try {
        const { data : { msg }, status } = await axios.post(`/api/signup`, credentials);

        let { userName } = credentials;

        /** send email */
        if(status === 201){
            await axios.post('/api/registerMail', { userName, text : msg})
        }

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}

/** login function */
export async function verifyPassword({ userName, password }){
    try {
        if(userName){
            const { data } = await axios.post('/api/login', { userName, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})
    }
}

/** update user profile function */
export async function updateUser(response){
    try {
        
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateUser', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile...!"})
    }
}

/** generate OTP */
export async function generateOTP(userName){
    try {
        const {data : { code }, status } = await axios.get('/api/generateOTP', { params : { userName }});
  
        // send mail with the OTP
        if(status === 201){
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail', { userName, text : text})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
  }
  

/** verify OTP */
export async function verifyOTP({ userName, code }){
    try {
       const { data, status } = await axios.get('/api/verifyOTP', { params : { userName, code }})
       return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

/** reset password */
export async function resetPassword({ userName, password }){
    try {
        const { data, status } = await axios.put('/api/resetPassword', { userName, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}


export async function SideBar() {
    try {
      const response = await axios.get('/api/sidebar');
      return { data: response.data };
    } catch (error) {
      return { error: "Internal Server Error" };
    }
  }
  
  export async function addMessage(sender, receiver, content) {
    try {
      const { data } = await axios.post('/api/addmsg', {
        from: sender,
        to: receiver,
        message: content
      });
  
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject({ error });
    }
  }
  
 
 

  export async function getMessage({ from, to }) {
    try {
      const { data, status } = await axios.get('/api/getmsg', { params: { from, to } });
      return { data, status };
    } catch (error) {
      return Promise.reject(error);
    }
  }

