import jwt from "jsonwebtoken";
import Auth from "../Model/AuthModel.js";


//Access Routes
const authmidd = async (req, res, next) => {    //extrect token

    try {
        const token = req.headers.authorization;

        const userdata = jwt.verify(token, 'Dalwadi');

        const vaerifyUser = await Auth.findById({ _id: userdata.id })

        req.user = vaerifyUser;

        next()
    } catch (error) {
        console.log(error);
    }

}

export default authmidd