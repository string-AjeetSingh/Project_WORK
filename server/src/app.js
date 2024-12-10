const aRouter = require('express').Router();
const bRouter = require('express').Router();
const controllers = require('./controllers/controllers');
const middleware = require('./middleware/middleware');


aRouter.get('/tryIt',
    middleware.jwtVerification,
    controllers.tryConnection);
aRouter.get('/hello', middleware.jwtVerification,
    (req, res, next) => {
        res.json("Very good, How about you, must be fine , let's work hard to be some one yes");
    })

aRouter.get('/login', middleware.authorize, controllers.login);
aRouter.get('/logout', middleware.authorize, controllers.logout);
aRouter.post('/token', middleware.authorize, controllers.token);
aRouter.post('/createPost', middleware.authorize, middleware.jwtVerification
    , controllers.createPost);
aRouter.post('/fetchPosts', controllers.fetchPosts);
aRouter.get('/fetchPosts', controllers.fetchPosts);

aRouter.use('/', (req, res) => {
    res.status(200);
    res.json({
        message: 'semes no one is interested here'
    });
})


module.exports = { aRouter, bRouter };

