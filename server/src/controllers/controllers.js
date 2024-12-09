const isDebugging = require('./../myLib/ifDebugging/ifDebugging');
const alib = require('./../myLib/PracLib/alib');
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
    const mongo = new alib('Work', process.env.MONGOSTRING);
    mongo.setCollection('Jobs');
    let result = await mongo.insertOne({
        "Document": "jobDummy",
        "jobData": {
            "title": req.body.data.title,
            "description": req.body.data.description,
            "requirements": req.body.data.requirements,
            "qualifications": req.body.data.qualifications
        },
        "jobSocialData": {
            "github": req.body.data.github,
            "email": req.body.data.email,
            "x": req.body.data.x
        },
        "companyName": req.body.data.companyName,
        "img": req.file.src

    });

    debug.console('result from server : ', result);
    mongo.over();
    res.json({
        messag: 'data must be set'
    })

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
