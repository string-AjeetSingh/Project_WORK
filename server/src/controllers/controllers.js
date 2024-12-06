module.exports.login = function (req, res, next) {
    req.setCookie('user', 'hero');
    res.status(200);
    res.json({
        status: true
    });
}