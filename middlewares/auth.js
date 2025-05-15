const User = require("../models/User")
const jwt = require("jsonwebtoken")

const protect = async (req , res , next) => {
    let token;

    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1]

            let decoded = jwt.verify(token , process.env.JWT_SECRET);
             req.user = await User.findById(decoded.id).select("-password")
            next();
            }else{
            res.status(401);
            throw new Error("Invalid Credentails : no token found !!")
        }
    } catch (error) {
        res.status(401);
        throw new Error("Invalid Credentails : no token found !!")
    }
}

module.exports = protect;