const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
    console.log(`[${err.code}] ${err.message}`);
    let errors = { email: "", password: "" };

    if (err.code === 11000) {
        errors.email = "this email is already registered";
    }
    else {
        if (err.message.includes("user validation fail")) {
            Object.values(err.errors).forEach(({ properties }) => {
                errors[properties.path] = properties.message;
            })
        }
        if (err.message === "incorrect email" || err.message === "incorrect password") {
            errors.email = "incorrect email and/or password";
        }
    }
    return errors;
}

const jwtSecret = "gDqpgngHE1C9LUR8gEnvWxfz8PMN96LT";
const maxAge = 3 * 24 * 60 * 60;

const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: maxAge
    });
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.create({email, password});
        const token = generateToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.login(email, password);
        const token = generateToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', "", { httpOnly: true, maxAge: 1 });
    res.redirect("/");
}
