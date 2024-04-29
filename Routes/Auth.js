import express from "express";
import Auth from "../Model/AuthModel.js";

const routers = express.Router()
import validateUser from './validate.js';

routers.get('/', (req, res) => {
    res.send('hii Dalwadi')
})

routers.post('/sign-up', (req, res) => {
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

        const register = Auth({
            userName: username,
            userEmail: email,
            userPass: password,
            userConformPass: conformpassword
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

routers.post('/sign-in', async (req, res) => {

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
            res.json({
                success: true,
                message: 'You are successfully logedin...'
            })
        } else {
            res.json({
                success: false,
                message: 'somthing want wrong!'
            })
        }
    }
})

export default routers