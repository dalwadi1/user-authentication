import jwt from "jsonwebtoken";

//Access Routes
const jwtAuthMiddelwer = (req, res, next) => {
    //extrect token

    const token = req.header.authentication.split("")[1];
    console.log(token);

    if (!token) {
        console.log('token not found');
    }
    try {

        const data = jwt.verify(token, "Dalwadi")
        req.user = decode;
        next();

    } catch (error) {

        console.log(error);
    }

}
//create token
const createToken = (userData) => {
    return jwt.sign(userData, "Dalwadi")
}

//reset-password token

const resetpasstoken = (data) => {
    return jwt.sign(data, "Dalwadi")
}

export {
    jwtAuthMiddelwer,
    createToken,
    resetpasstoken
}