

module.exports.login = function (req, res, next) {

    if (req.signedCookies.user) {
        res.status(200);
        res.json({
            status: 0, message: 'already had cookie'
        })
    }
    else {
        res.cookie('user', 'hero', { signed: true });
    }

    res.status(200);
    res.json({
        status: 1
    });

}

module.exports.logout = (req, res) => {

    if (req.signedCookies.user) {
        res.clearCookie('user');
        res.status(200).json({
            status: 1, messag: "succesfully log out."
        })
    }
    else {
        res.status(200).json({
            status: 0, messag: "no user yet to logout."
        })
    }
};

module.exports.token = function (req, res, next) {


    let token = req.theJwt.sign({
        email: req.signedCookies.email
    }, process.env.SECRATE, { expireIn: '3d' });

    if (req.signedCookies.email) {       //if user exists

        res.clearCookie('token');        // clear old one
        res.cookie('token', token, {
            signed: true,
            maxAge: 1000 * 60 * 60 * 24 * 2
        });

        res.status(200);
        res.json({
            status: 1, message: 'succesfully have token'
        }).end();
    }

    res.cookie('token', token, {
        signed: true,
        maxAge: 1000 * 60 * 60 * 24 * 2
    });

    res.status(200);
    res.json({
        status: 1, message: 'succesfully have token'
    });


}