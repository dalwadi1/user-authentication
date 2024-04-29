import express from "express";
import Auth from "../Model/AuthModel.js";
import { jwtAuthMiddelwer, createToken } from "../MIddlewer/JwtAuth.js";
import bcrypt from "bcrypt";


const router = express.Router()
import validateUser from './validate.js';

router.get('/', (req, res) => {
    res.send('hii Dalwadi')
})

router.post('/sign-up', (req, res) => {
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

        const cpass = bcrypt.hash(password, 10)
        console.log(cpass);

        const register = Auth({
            userName: username,
            userEmail: email,
            userConformPass: cpass
        })
        const data = register.save()
        if (data) {
            res.json({
                success: true,
                message: 'You are successfully registered!'
            })
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

        const matchUser = await Auth.findOne({ userEmail: email, userConformPass: password })
        if (matchUser) {

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
            res.json({
                success: false,
                message: 'somthing want wrong!'
            })
        }
    }
})

export default router