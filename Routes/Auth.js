import express from "express";
import Auth from "../Model/AuthModel.js";
import { jwtAuthMiddelwer, createToken } from "../MIddlewer/JwtAuth.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";



const router = express.Router()
import validateUser from './validate.js';

router.get('/', (req, res) => {
    res.send('hii Dalwadi')
})

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

            const token = createToken(payload);

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
            const token = findUser.token
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

router.put('/forgot-pass', async (req, res) => {

    const { pass, cpass } = req.body.formdata
    const token = req.body.token

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
        const matchUser = Auth.find({})
        if (matchUser) {
            const newhaspass = bcrypt.hash(pass, 10)
            console.log(matchUser);

            // const Update = matchUser.updateOne({ userConformPass: newhaspass })

            // if (Update) {
            //     res.json({
            //         success: true,
            //         message: "password successfully update!"
            //     })
            // }
        }
    }

})

export default router