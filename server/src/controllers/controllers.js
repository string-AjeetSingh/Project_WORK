const { emit } = require('process');
const isDebugging = require('./../myLib/ifDebugging/ifDebugging');
const alib = require('./../myLib/PracLib/alib');
const utils = require('./../utils/utils');
const path = require('path');
const { MongoOIDCError } = require('mongodb');

const debug = new isDebugging(process.env.IS_DEBUGGING);

module.exports.login = function (req, res, next) {

    if (req.signedCookies.user) {
        res.status(200);
        res.json({
            status: 0, message: 'already had cookie'
        })
    }
    else {
        res.cookie('user', 'hero', { signed: true });
    }

    res.status(200);
    res.json({
        status: 1
    });

}

module.exports.logout = (req, res) => {

    if (req.signedCookies.user) {
        res.clearCookie('user');
        res.status(200).json({
            status: 1, messag: "succesfully log out."
        })
    }
    else {
        res.status(200).json({
            status: 0, messag: "no user yet to logout."
        })
    }
};

module.exports.token = function (req, res, next) {


    debug.console('from token control - ');
    debug.console('data form client body  ', req.body);

    let token = req.theJwt.sign({
        userData: {
            email: req.body.userData.email
        }
    }, process.env.SECRATE, { expiresIn: '3d' });

    debug.console('creted token : ', token);

    if (req.signedCookies.token) {       //if user exists

        debug.console('pre exist user ');

        res.clearCookie('token');        // clear old one
        debug.console('cookie must be clean');

        res.cookie('token', token, {
            httpOnly: true,
            signed: true,
            maxAge: 1000 * 60 * 60 * 24 * 2
        });

        debug.console('cookie must be setteed');

        res.status(200);
        res.json({
            status: 1, message: 'succesfully have token'
        }).end();
        return;
    }

    debug.console('pure token call');

    res.cookie('token', token, {
        signed: true,
        maxAge: 1000 * 60 * 60 * 24 * 2
    });

    res.status(200);
    res.json({
        status: 1, message: 'succesfully have token'
    });


}

module.exports.tryConnection = async (req, res, next) => {

    const mongo = new alib('Work', process.env.MONGOSTRING);
    mongo.setCollection('Jobs');
    let result = await mongo.find();
    debug.console('the res is : ', result);

    await mongo.over();
    res.json({
        messag: 'must be connected'
    })
};

module.exports.createPost = async (req, res, next) => {

    debug.console('From CreatePost -');

    req.body.data = utils.jsonParseIfString(req.body.data);
    debug.console('the req.body.data : ', req.body.data);



    debug.console('the req.file : ', req.file);
    if (req.body.data) {

        let upload = {};
        let matchList = [
            "title", "desciption", "requirments",
            "qualifications", "responsibilities",
            "github", "email", "location",
            "x", "companyName"
        ]

        req.body.data.forEach((item) => {
            matchList.forEach((match) => {
                if (item.inputData.name === match) {
                    upload[match] = item.inputData.data;
                }
            })
        })


        const mongo = new alib('Work', process.env.MONGOSTRING);
        mongo.setCollection('Jobs');
        let result = await mongo.insertOne({
            "Document": "jobDummy",
            "jobData": {
                "title": upload.title,
                "description": upload.desciption,
                "requirements": upload.requirments,
                "qualifications": upload.qualifications
            },
            "jobSocialData": {
                "github": upload.github,
                "email": upload.email,
                "x": upload.x
            },
            "companyName": upload.companyName,
            "img": req.file.path,
            "location": upload.location

        });

        debug.console('result from server : ', result);
        /* 
*/
        mongo.over();
        res.json({
            message: "data must be set to database",
            data: upload
        })


        return;
    }
    else {
        res.status(404).json({
            message: 'from createPost'
        }).end()
        return;
    }



};

module.exports.fetchPosts = async (req, res, next) => {
    const mongo = new alib('Work', process.env.MONGOSTRING);
    mongo.setCollection('Jobs');
    let result = await mongo.find({});

    debug.console('result from server : ', result);
    mongo.over();
    res.json({
        messag: 'data must be fetched',
        data: result
    })

};

module.exports.temp = (req, res) => {
    debug.console('from temp -  ');
    if (req.file) {

        debug.console('the req.file : ', req.file);
        res.status(200).json({
            message: 'file is found here',
            filePath: path.join(process.env.SERVER_BASE, req.file.path)
        })
        return;
    }
    else {
        res.status(404).json({
            message: 'file not recived'
        })
    }
};


module.exports.profileImg = async (req, res) => {

    debug.console('from profileImg - ');
    if (req.userData.email) {
        debug.console('found token user');

        const mongo = new alib('Work', process.env.MONGOSTRING);
        mongo.setCollection('Users');
        let response = await mongo.find({ 'userSocialData.email': req.userData.email });

        mongo.over();
        if (response.length > 0) {
            debug.console('found data from mongo', response);
            res.json({
                status: 1,
                url: '/xtServer/api' + response[0].userData.img
            })
        }
        else {
            debug.console('not found data from mongo');
            res.json({
                status: -1, message: "No Matching entry found"
            })
        }
    }
};


module.exports.userDetail = async (req, res) => {

    debug.console('from userDetail -');

    if (req.userData.email) {
        debug.console(' token email found ');
        const mongo = new alib('Work', process.env.MONGOSTRING);

        mongo.setCollection('Users');
        let result = await mongo.find({ 'userSocialData.email': req.userData.email });


        if (result.length > 0) {
            debug.console('entry found');
            res.json({
                status: 1,
                data: result[0]
            })
        }
        else {
            debug.console('no entry found');
            res.json({
                status: -1,
                message: 'no Entry found'
            })
        }
    }

};


module.exports.isRegistered = async (req, res) => {
    debug.console('form isRegistered -- ');


    if (req.userData) {
        debug.console('found user', req.userData.email);

        let mongo = new alib('Work', process.env.MONGOSTRING);
        mongo.setCollection('users');

        let result = await mongo.
            find({ 'userSocailData.email': req.userData.email });

        if (result.length > 0) {
            debug.console('found result ', result);
            res.json({
                status: 1
            });
        }
        else {
            debug.console('user not registered in database');
            res.json({
                status: 0, message: "no result found"
            })
        }
    }
    else {
        debug.console('semmes not found user');
        res.status(404).json({
            status: -1, message: "not found users at the request you made"
        })
    }
};

module.exports.register = async (req, res) => {

    debug.console('From Register -');


    req.body.data = utils.jsonParseIfString(req.body.data);
    debug.console('the req.body.data : ', req.body.data);



    debug.console('the req.file : ', req.file);
    if (req.body.data) {

        let upload = {};
        upload['color'] = null;
        upload['img'] = null;

        let matchList = [
            "title", "discription", "education", "status",
            "skills", "experiance",
            "github", "email",
            "x", "name"
        ]

        req.body.data.forEach((item) => {
            if (item.index === 1) {
                upload['color'] = item.inputData.data[1].color;
            }

            matchList.forEach((match) => {

                if (item.inputData.name === match) {
                    upload[match] = item.inputData.data;
                }
            })
        })


        const mongo = new alib('Work', process.env.MONGOSTRING);
        mongo.setCollection('Users');


        let result = await mongo.insertOne({
            "Document": "Dumyuser",
            "userData": {
                "status": upload.status,
                "title": upload.title,
                "description": upload.discription,
                "experiance": upload.experiance,
                "skills": upload.skills,
                "education": upload.education
            },
            "userSocialData": {
                "github": upload.github,
                "email": upload.email,
                "x": upload.x
            },
            "name": upload.name,
            "img": req.file ? req.file.path : null,

        });

        debug.console('result from server : ', result);


        mongo.over();
        res.json({
            status: 1,
            message: "see uploaded data, this must be uploaded ",
            data: upload
        })


        return;
    }
    else {
        res.status(404).json({
            status: 0,
            message: 'from Register'
        }).end()
        return;
    }



};