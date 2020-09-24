const User = require("../models/User");
const jwt = require("jsonwebtoken");

const jwtSecret = "gDqpgngHE1C9LUR8gEnvWxfz8PMN96LT";

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, jwtSecret, (error, decodedToken) => {
            if(!error) {
                console.log(decodedToken);
                next();
            }
            else {
                console.log(error.message);
                res.redirect("/login");
            }
        });
    }
    else {
        res.redirect("/login");
    }
}

const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt
    res.locals.user = null;
    if (token) {
        await jwt.verify(token, jwtSecret, async (error, decodedToken) => {
            if(error) {
                console.log(error.message);
            }
            else {
                res.locals.user = await User.findById(decodedToken.id);
            }
        });
    }
    next();
}

module.exports = { requireAuth, checkUser };
