import mongoose from "mongoose";

const Registration = mongoose.Schema({
    userName: {
        type: 'string'
    },
    userEmail: {
        type: 'string'
    },
    role: {
        type: 'string',
        default: 'user'
    },
    userPass: {
        type: 'string'
    },
    userConformPass: {
        type: 'string'
    },
    token: {
        type: 'string',
    }
})

const Registered = mongoose.model('AuthTable', Registration);

export default Registered
