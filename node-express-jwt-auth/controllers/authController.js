module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.signup_post = (req, res) => {
    const {email, password} = req.body;
    res.send(`email: ${email}, password: ${password}`);
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.login_post = (req, res) => {
    const {email, password} = req.body;
    res.send(`email: ${email}, password: ${password}`);
}

module.exports.logout_get = (req, res) => {
    res.send("User logout");
}
