const aRouter = require('express').Router();
const bRouter = require('express').Router();
const express = require('express');
const multer = require("multer");
const path = require('path');


const controllers = require('./controllers/controllers');
const middleware = require('./middleware/middleware');
const { copyFileSync } = require('fs');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/jobsImg");
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname +
                Date.now().toLocaleString().toString() + path.extname(file.originalname));
        }
    })
})

const tempUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/temp");
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname +
                Date.now().toLocaleString().toString() + path.extname(file.originalname));
        }
    })
})

aRouter.use(express.json());
aRouter.use('/uploads', express.static('uploads'));
aRouter.use(middleware.errors);



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

aRouter.post('/temp', middleware.authorize,
    middleware.jwtVerification, tempUpload.single('tempImg')
    , controllers.temp
)

aRouter.post('/createPost', middleware.authorize
    , middleware.jwtVerification, upload.single('theImg')
    , controllers.createPost);

aRouter.post('/fetchPosts', controllers.fetchPosts);
aRouter.get('/fetchPosts', controllers.fetchPosts);

aRouter.get('/profileImg', middleware.authorize, middleware.jwtVerification,
    controllers.profileImg);

aRouter.get('/userDetail', middleware.authorize, middleware.jwtVerification,
    controllers.userDetail
)

aRouter.use('/', (req, res) => {
    res.status(200);
    console.log("from LastReciever");
    console.log('no one interested here');
    res.json({
        message: 'semes no one is interested here'
    });
})


module.exports = { aRouter, bRouter };

