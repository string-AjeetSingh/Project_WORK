const aRouter = require('express').Router();
const bRouter = require('express').Router();
const express = require('express');
const multer = require("multer");
const utils = require('./utils/utils')
const path = require('path');


const controllers = require('./controllers/controllers');
const middleware = require('./middleware/middleware');



const uploadToMemory = multer({
    storage: multer.memoryStorage()
});

/* 

const uploadProfileImg = multer({
    storage: multer.memoryStorage(),
    fileFilter: function (req, file, cb) {
        if (path.extname(file.originalname) === ".jpeg" ||
        path.extname(file.originalname) === ".jpg" ||
        path.extname(file.originalname) === ".png") {
            
    } else {
        
}
},
limits: {
    fileSize: 1 * 1024 * 1024 * 3
}
})

*/

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


aRouter.post('/rough', uploadToMemory.single('theImg'),
    utils.profileImgCheck, controllers.rough);

aRouter.post('/roughPdf', uploadToMemory.single('thePdf'),
    utils.pdfCheck, controllers.rough);

aRouter.get('/roughGetFile', controllers.roughGetFile);
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
aRouter.get('/deleteWork', controllers.deleteWork);


aRouter.post('/temp', middleware.authorize,
    middleware.jwtVerification, uploadToMemory.single('tempImg'),
    utils.profileImgCheck
    , controllers.temp
)

aRouter.post('/createPost', middleware.authorize
    , middleware.jwtVerification, uploadToMemory.single('theImg'),
    utils.profileImgCheck
    , controllers.createPost);

aRouter.post('/register', middleware.authorize
    , middleware.jwtVerification, uploadToMemory.single('theImg'),
    utils.profileImgCheck
    , controllers.register);

aRouter.post('/updateUserProfile', middleware.authorize
    , middleware.jwtVerification, uploadToMemory.single('theImg'),
    utils.profileImgCheck
    , controllers.updateUserProfile);

aRouter.post('/fetchPosts', controllers.fetchPosts);
aRouter.get('/fetchPosts', controllers.fetchPosts);
aRouter.get('/fetchTempImg', controllers.fetchTempImg);
aRouter.get('/fetchJobImg', controllers.fetchJobImg);
aRouter.get('/fetchProfileImg', controllers.fetchProfileImg);
aRouter.get('/fetchJobPdf', controllers.fetchJobPdf);

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
    uploadToMemory.single('thePdf'), utils.pdfCheck
    , controllers.apply
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

