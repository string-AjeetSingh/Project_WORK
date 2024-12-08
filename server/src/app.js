const aRouter = require('express').Router();
const controllers = require('./controllers/controllers');
const middleware = require('./middleware/middleware');

aRouter.use(middleware.authorize);


aRouter.get('/hello', (req, res, next) => {
    res.json("Very good, How about you, must be fine , let's work hard to be some one yes");
})

aRouter.get('/login', controllers.login);
aRouter.get('/logout', controllers.logout);
aRouter.post('/token', controllers.token);

aRouter.use('/', (req, res) => {
    res.status(200);
    res.json({
        message: 'semes no one is interested here'
    });
})


module.exports = aRouter;

