const User = require("../models/User");

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
    }
    return errors;
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.create({email, password});        
        res.status(201).json(user);
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
    res.send(`email: ${email}, password: ${password}`);
}

module.exports.logout_get = (req, res) => {
    res.send("User logout");
}
