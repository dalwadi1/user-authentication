import express from "express";
import Auth from "../Model/AuthModel.js";
import { createToken } from "../MIddlewer/JwtAuth.js";
import authmidd from "../MIddlewer/AuthMidd.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const router = express.Router()
import validateUser from './Helper/validate.js';

router.get('/', (req, res) => {
    res.send('hii Dalwadi')
})

//sign up route
router.post('/sign-up', async (req, res) => {
    const { username, email, password, conformpassword } = req.body

    const { error, value } = validateUser.validateUser.validate({
        username: username,
        email: email,
        password: password,
        conformpassword: conformpassword
    });

    if (error) {
        res.json({
            success: false,
            message: error.message
        })
    } else {

        const checkEmail = await Auth.findOne({ userEmail: email })
        if (checkEmail) {
            res.json({
                success: false,
                message: 'Email Address allready Exist!'
            })
        } else {
            const newhash = await bcrypt.hash(conformpassword, 10);

            const payload = {
                username: username,
                userEmail: email
            }

            const token = Math.random().toString(36).slice(2);

            const register = Auth({
                userName: username,
                userEmail: email,
                userConformPass: newhash,
                token: token
            })
            const data = register.save()
            if (data) {
                res.json({
                    success: true,
                    message: 'You are successfully registered!'
                })
            }
        }
    }
})

//sign in route
router.post('/sign-in', async (req, res) => {

    const { email, password } = req.body

    const { error, value } = validateUser.loginValidate.validate({
        email: email,
        password: password,
    });

    if (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
    else {
        const matchUser = await Auth.findOne({ userEmail: email })
        if (matchUser) {
            const storedHash = matchUser.userConformPass;
            const match = await bcrypt.compare(password, storedHash);
            if (match) {

                const payload = {
                    id: matchUser.id,
                    username: matchUser.userName
                }

                const token = createToken(payload);
                console.log(req.header);
                res.json({
                    success: true,
                    message: 'You are successfully logedin...',
                    token: token
                })
            } else {
                if (!match) {
                    res.json({
                        success: false,
                        message: 'Wrong password!'
                    })
                }
            }
        } else {
            res.json({
                success: false,
                message: "Email Address Dosen't exist!"
            })
        }


    }
})

//send mail route
router.post('/send-mail', async (req, res) => {

    const { email } = req.body


    const { error, value } = validateUser.forgotpass.validate({
        email: email,
    });
    if (error) {
        res.json({
            success: false,
            message: error.message
        })
    } else {
        const findUser = await Auth.findOne({ userEmail: email })
        if (findUser) {

            var sendEmail = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "9e0e42d7ecd8a7",
                    pass: "c9ec7a96fd1ded"
                }
            });
            const mailData = ({
                from: "@Dalwadi",
                to: findUser.userEmail,
                subject: 'reset password',
                html: `<a href="http://localhost:5173/forgot-pass/${findUser.token}">reset password</a>`
            })
            const checkMS = sendEmail.sendMail(mailData)
            if (checkMS) {
                res.json({
                    success: true,
                    message: 'email send successfully'
                })
            }
        }
        else {
            res.json({
                success: false,
                message: 'email address not find'
            })
        }
    }
})

//forget password route
router.put('/forgot-pass', async (req, res) => {

    const { pass, cpass } = req.body.formdata
    const Rtoken = req.body.token
    const findUser = await Auth.findOne({ token: Rtoken })
    // console.log(findUser);

    const { error, value } = validateUser.forgotpass.validate({
        password: pass,
        conformpassword: cpass

    })
    if (error) {
        res.json({
            success: false,
            message: error.message
        })
    } else {
        // console.log(token);
        if (findUser) {
            // console.log(cpass);
            const newhaspass = await bcrypt.hash(pass, 10)
            console.log(newhaspass);

            const Update = await findUser.updateOne({ userConformPass: newhaspass })

            if (Update) {
                res.json({
                    success: true,
                    message: "password successfully update!"
                })
            }
        }
    }
})

//user deshbord route
router.get('/auth', (req, res) => {
    res.json({
        success: true,
        message: "You are loged in"
    })
})

//profile route
router.get('/profile', authmidd, async (req, res) => {

    const userdata1 = req.user

    res.json({
        userProfile: userdata1
    })

})
export default router