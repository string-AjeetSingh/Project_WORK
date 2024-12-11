const jwt = require('jsonwebtoken');
let ifDebugging = require('./../myLib/ifDebugging/ifDebugging');
const utils = require('./../utils/utils');

const debug = new ifDebugging(process.env.IS_DEBUGGING);

module.exports.authorize = (req, res, next) => {
    debug.console('from authorize');
    debug.console('to path : ', req.path);

    req.body.data = utils.jsonParseIfString(req.body.data);
    req.body = utils.jsonParseIfString(req.body);

    debug.console('req.body is ', req.body);
    debug.console('req.query : ', req.query);
    console.log('from authorize the method of communication : ', req.method)

    if ('authorized' in req.headers) {
        if (req.headers.authorized) {
            req['theJwt'] = jwt;

            next();
        } else {
            res.status(404).json({
                status: -1,
                'message':
                    'unauthorizd, please login'
            })
        }
    }
    else {
        res.status(404).json({
            status: -2,
            'message':
                'unauthorizd, please provide authorized property in header'
        })
    }

}


module.exports.jwtVerification = (req, res, next) => {

    debug.console("from jwtVerification --");

    let token = req.signedCookies.token;
    debug.console('token we found is : ', token);

    jwt.verify(token, process.env.SECRATE, (err, decode) => {
        if (err) {
            debug.console('found error, unverified', err);
            res.status(403).json({
                status: -1,
                message: `Bad Request, unverified token`
            })
            return;
        }
        req['userData'] = decode.userData;  // setting for next use.
        debug.console('we found the decoded here it is :', req.userData);
        next();
    })
}

module.exports.errors = (err, req, res, next) => {

    if (err) {
        console.log('semmes a error occure', err);
        res.status(500).json({
            status: -1,
            message: 'semmes a error occure'
        })
        return;
    }
    else {
        next();
    }
};