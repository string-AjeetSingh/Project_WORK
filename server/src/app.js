const aRouter = require('express').Router();
const bRouter = require('express').Router();
const express = require('express');
const multer = require("multer");
const path = require('path');


const controllers = require('./controllers/controllers');
const middleware = require('./middleware/middleware');


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

const uploadPdf = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/jobsPdf");
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname +
                Date.now().toLocaleString().toString() + path.extname(file.originalname));
        }
    }),
    fileFilter: function (req, file, cb) {


        if (file.mimetype === 'application/pdf') {
            cb(null, true)
        }
        else {
            cb(new Error(1));
        }
    },
    limits: {
        fileSize: 1 * 1024 * 1024 * 3
    }
}).single('thePdf');

const profileImg = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/usersImg");
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


aRouter.get('/rough', controllers.rough);
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
aRouter.get('/isRegistered', middleware.jwtVerification,
    controllers.isRegistered)


aRouter.post('/temp', middleware.authorize,
    middleware.jwtVerification, tempUpload.single('tempImg')
    , controllers.temp
)

aRouter.post('/createPost', middleware.authorize
    , middleware.jwtVerification, upload.single('theImg')
    , controllers.createPost);

aRouter.post('/register', middleware.authorize
    , middleware.jwtVerification, profileImg.single('theImg')
    , controllers.register);

aRouter.post('/updateUserProfile', middleware.authorize
    , middleware.jwtVerification, profileImg.single('theImg')
    , controllers.updateUserProfile);

aRouter.post('/fetchPosts', controllers.fetchPosts);
aRouter.get('/fetchPosts', controllers.fetchPosts);

aRouter.get('/fetchAPost', middleware.authorize, middleware.jwtVerification,
    controllers.fetchAPosts
)

aRouter.get('/fetchUserPosts', middleware.authorize, middleware.jwtVerification,
    controllers.fetchUserPosts);
aRouter.post('/fetchUserPosts', middleware.authorize, middleware.jwtVerification,
    controllers.fetchUserPosts);

aRouter.get('/profileImg', middleware.authorize, middleware.jwtVerification,
    controllers.profileImg);

aRouter.get('/userDetail', middleware.authorize, middleware.jwtVerification,
    controllers.userDetail
)
aRouter.get('/usersApplied', middleware.authorize, middleware.jwtVerification,
    controllers.userApplied
)
aRouter.get('/providerDetail', middleware.authorize, middleware.jwtVerification,
    controllers.providerDetail
)

aRouter.post('/search', middleware.authorize, middleware.jwtVerification,
    controllers.search
)

aRouter.post('/apply', middleware.authorize, middleware.jwtVerification,
    (req, res, next) => {
        uploadPdf(req, res, (err) => {
            if (err) {

                if (err instanceof multer.MulterError) {

                    res.json({
                        status: -2,
                        message: err.message
                    })
                    console.error('Multer error found at apply  : ', err.message);

                    return;
                }
                if (err.message) {
                    console.error('Plesase provide pdf to apply');
                    res.json({
                        status: -1,
                        message: 'expected pdf, please provide pdf file'
                    })
                    return;
                }
                res.status(500).end();
                console.error('error found at apply  : ', err.message);
                return;
            } else {
                next();
            }
        })
    }, controllers.apply
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

