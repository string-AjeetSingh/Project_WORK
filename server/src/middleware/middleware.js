const jwt = require('jsonwebtoken');
let ifDebugging = require('./../myLib/ifDebugging/ifDebugging');

const debug = new ifDebugging(process.env.IS_DEBUGGING);

module.exports.authorize = (req, res, next) => {
    debug.console('from authorize')
    // debug.console('req.body is ', req.body);
    //debug.console('req.query : ', req.query);
    console.log('from authorize the method of communication : ', req.method)

    if (req.method === 'GET') {
        if ('authorized' in req.query) {
            if (req.query.authorized) {
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
                    'unauthorizd, please config authorized properity in  req.query'
            })
        }


    }
    else if (req.method === 'POST') {
        if ('authorized' in req.body) {

            if (req.body.authorized) {

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
                    'unauthorizd, please config authorized properity in  req.body'
            })

        }

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