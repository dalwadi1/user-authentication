import jwt from "jsonwebtoken";


//create token
const createToken = (userData) => {
    return jwt.sign(userData, "Dalwadi")
}

export {
    createToken,
}