import { request } from 'express';
import UserModel from './user.model.js';
import Message from './message.modal.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from './config.js'
import otpGenerator from 'otp-generator';

import dotenv from 'dotenv';
dotenv.config();


export async function verifyUser(req, res, next){
    try {
        
        const { userName } = req.method == "GET" ? req.query : req.body;
        let exist = await UserModel.findOne({ userName });
        if(!exist) return res.status(404).send({ error : "Can't find User!"});
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error"});
    }
}



export async function signup(req, res) {
  try {
    const { userName, password, firstName, lastName } = req.body;

    const existingUser = await UserModel.findOne({ userName });

    if (existingUser) {
      return res.status(400).json({ error: "Please use a unique username" });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new UserModel({
        userName,
        password: hashedPassword,
        firstName,
        lastName
      });

      const result = await user.save();

      return res.status(201).json({ msg: "User registered successfully" });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


export async function login(req, res) {
    const { userName, password } = req.body;
    try {
      UserModel.findOne({ userName }).then(user => {
        bcrypt.compare(password, user.password).then(passwordCheck => {
          if (!passwordCheck) {
            return res.status(400).send({ error: "Incorrect password" });
          }
          const token = jwt.sign(
            {
              userId: user._id,
              userName: user.userName
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
          );
          return res.status(200).send({
            msg: "Login successful",
            userName: user.userName,
            userId: user._id,
            token
          });
        }).catch(error => {
          return res.status(400).send({ error: "Incorrect password" });
        });
      }).catch(error => {
        return res.status(404).send({ error: "Username not found" });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  

  export async function getUser(req, res) {
    const { userName } = req.params;
  
    try {
      if (!userName) {
        return res.status(400).send({ error: "Invalid Username" });
      }
  
      const user = await UserModel.findOne({ userName });
  
      if (!user) {
        return res.status(404).send({ error: "Couldn't Find the User" });
      }
      const { password, ...rest } = Object.assign({}, user.toJSON());
      return res.status(200).send(rest);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  }
  
  export async function getUserData(req, res) {
    const { _id } = req.query;
  
    try {
      if (!_id) {
        return res.status(400).send({ error: "Invalid User" });
      }
  
      const user = await UserModel.findOne({ _id });
  
      if (!user) {
        return res.status(404).send({ error: "Couldn't Find the User" });
      }
      const { password, ...rest } = Object.assign({}, user.toJSON());
      return res.status(200).send(rest);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  }
  


  export async function updateUser(req, res) {
    try {
        
        const { userId } = req.user;

        if (userId) {
            const body = req.body;

            // update the data
            await UserModel.updateOne({ _id: userId }, body);

            return res.status(201).send({ msg: "Record Updated...!" });
        } else {
            return res.status(401).send({ error: "User Not Found...!" });
        }

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}


export async function generateOTP(req,res){
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(201).send({ code: req.app.locals.OTP })
}

export async function verifyOTP(req,res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successsfully!'})
    }
    return res.status(400).send({ error: "Invalid OTP"});
}

export async function createResetSession(req,res){
    if(req.app.locals.resetSession){
        return res.status(201).send({ flag : req.app.locals.resetSession})
   }
   return res.status(440).send({error : "Session expired!"})
}


export async function resetPassword(req, res) {
    try {
      if (!req.app.locals.resetSession) {
        return res.status(440).send({ error: "Session expired!" });
      }
  
      const { username, password } = req.body;
  
      try {
        const user = await UserModel.findOne({ username });
        if (!user) {
          return res.status(404).send({ error: "Username not found" });
        }
  
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.updateOne(
          { username: user.username },
          { password: hashedPassword }
        );
  
        req.app.locals.resetSession = false; // reset session
        return res.status(201).send({ msg: "Record Updated...!" });
      } catch (error) {
        return res.status(500).send({ error: "Unable to hash password" });
      }
    } catch (error) {
      return res.status(401).send({ error });
    }
  }
  

  export async function getAllUsers(req, res) {
    try {
      const users = await UserModel.find({}, { firstName: 1, lastName: 1, userName: 1, _id: 1 });
      return res.status(200).send(users);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  }

  export async function addMessage(req, res, next) {
    try {
      const { from, to, message } = req.body;
      const data = await Message.create({
        content: message,
        users: [from, to],
        sender: from
      });
  
      if (data) {
        return res.status(200).json({ data });
      } else {
        return res.status(400).json({ error: "Failed to add message to the database" });
      }
    } catch (ex) {
      next(ex);
    }
  };
  
  export async function getMessage(req, res, next) {
    try {
      const { from, to } = req.query;
      const data = await Message.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });
      const projectedMessages = data.map((msg) => {
        return {
          sent: msg.sender.toString() === from,
          users: msg.users,
          content: msg.content,
          time: msg.time 
        };
      });
      res.json(projectedMessages);
    } catch (ex) {
      next(ex);
    }
  };
  
  
