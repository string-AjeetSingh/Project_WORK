const aRouter = require('express').Router();


aRouter.get('/hello', (req, res, next) => {
    res.json("Very good, How about you, must be fine , let's work hard to be some one yes");
})



module.exports = aRouter;

