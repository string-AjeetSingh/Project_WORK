const jwt = require('jsonwebtoken');
let ifDebugging = require('./../myLib/ifDebugging/ifDebugging');

const debug = new ifDebugging(process.env.IS_DEBUGGING);
module.exports.authorize = (req, res, next) => {
    debug.console('from authorize')
    // debug.console('req.body is ', req.body);
    //debug.console('req.query : ', req.query);

    if (req.body) {
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

    else {

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


}


