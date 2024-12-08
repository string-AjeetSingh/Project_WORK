const jwt = require('jsonwebtoken');

module.exports.authorize = (req, res, next) => {

    if (req.method === 'POST') {
        if (req.body) {
            if ('authorized' in req.body) {
                console.log('contain body.authorize');
                if (req.body.authorized) {
                    console.log('contain body.authorize good val');
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

}


