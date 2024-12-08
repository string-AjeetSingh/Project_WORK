const aRouter = require('express').Router();
const controllers = require('./controllers/controllers');
const middleware = require('./middleware/middleware');

aRouter.get('*', middleware.authorize);
aRouter.post('*', middleware.authorize);

aRouter.get('/hello', (req, res, next) => {
    res.json("Very good, How about you, must be fine , let's work hard to be some one yes");
})

aRouter.get('/login', controllers.login);
aRouter.get('/logout', controllers.logout);
aRouter.get('/token', controllers.token);



module.exports = aRouter;

