const User = require("../models/User");

const handleErrors = (error) => {
    console.log(error.message, error.code);
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
        res.status(400).send("Error, user not created");
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
