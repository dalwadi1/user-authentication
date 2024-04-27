import express from "express";
import Auth from "../Model/AuthModel.js";
const routers = express.Router()

routers.get('/', (req, res) => {
    res.send('hii Dalwadi')
})

routers.post('/register', (req, res) => {
    const { username, email, password, conformpassword } = req.body
    console.log('done');
    // const register = Auth({
    //     userName: userName,
    //     userEmail: userEmail,
    //     userPass: userPass,
    //     userConformPass: userConformPass
    // })
    // register.save()
})

export default routers