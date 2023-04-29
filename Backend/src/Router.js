import { Router } from "express";
import * as controller from "./appcontroller.js"
import Auth,{localVariables} from "./auth.js";
import { registerMail } from './mailer.js';
const router = Router();
router.route('/signup').post(controller.signup);
router.route('/registerMail').post(registerMail);
router.route('/authenticate').post(controller.verifyUser,(req,res) => res.end());
router.route('/login').post(controller.verifyUser,controller.login);



router.route('/userData').get(controller.getUserData);
router.route('/user/:userName').get(controller.getUser);


router.route('/generateOTP').get(controller.verifyUser,localVariables,controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyOTP);
router.route('/createResetSession').get(controller.createResetSession);

router.route('/updateUser').put(Auth,controller.updateUser);
router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword);



router.route('/addmsg').post(controller.addMessage);
router.route('/getmsg').get(controller.getMessage);

router.route('/sidebar').get(controller.getAllUsers);


export default router;