const alib = require('./../myLib/PracLib/alib');
const isDebugging = require('./../myLib/ifDebugging/ifDebugging');
const path = require('path');
const debug = new isDebugging(parseInt(process.env.IS_DEBUGGING));

module.exports.jsonParseIfString = (val) => {
    debug.console('from jsonParseIfString() Util');
    debug.console('type of : ', typeof val);
    if (typeof val == 'string') {
        let result;
        debug.console('provided val is string', val);
        result = JSON.parse(val);
        return result;
    }
    else {
        debug.console('no modifications');
        return val;
    }
}

module.exports.setPrevNo = async (collection) => {

    debug.console('from the setPrevNo  -- -- --');
    let mongo = new alib("Work", process.env.MONGOSTRING);
    mongo.setCollection(collection);

    let result = await mongo.find({ 'Document': 'val' });
    if (result.length > 0) {
        let updateVal = null;
        debug.console('found val , must contain prevNo ', result);

        if (result[0].prevNo === null) {
            updateVal = 1;

        } else if (result[0].prevNo) {
            updateVal = result[0].prevNo + 1;

        }
        debug.console("the updated no is ", updateVal);
        result = await mongo.updateOne({ "Document": 'val' },
            { $set: { 'prevNo': updateVal } });
        debug.console('the prevNo must be updated the status : ', result);
        if (result.modifiedCount) {

            debug.console('update succesfully');
            return updateVal;
        }
        debug.console('prevNo is unable to update');
        return false;
    }
    else {
        debug.console('not found prevNo');
        return false;
    }

};

module.exports.profileImgCheck = (req, res, next) => {
    if (req.file) {
        let file = req.file;
        let pass = true;
        if (path.extname(file.originalname) === ".jpeg" ||
            path.extname(file.originalname) === ".jpg" ||
            path.extname(file.originalname) === ".png") {
            debug.console('no found error from uploadToMemory -- -- --, the ext is ', path.extname(file.originalname));
        } else {


            debug.console('found error from uploadToMemory -- -- --, the ext is ', path.extname(file.originalname));
            res.json({
                status: 0,
                message: " Only provide png / jped / jpg , try again"
            })
            pass = false;
            return;

        }
        if (file.size > 1 * 1024 * 1024 * 3) {
            debug.console('found error from uploadToMemory -- -- --, the size is large than 3 mb ', file.size);
            res.json({
                status: 0,
                message: " Only provide less than 3 Mb"
            })
            pass = false;
            return;
        }
        if (pass) {
            next();
        }
    } else {
        debug.console('no file recieved');
        next();
    }
};

module.exports.pdfCheck = (req, res, next) => {
    if (req.file) {
        let file = req.file;
        let pass = true;
        if (path.extname(file.originalname) === ".pdf") {
            debug.console('no found error from uploadToMemory -- -- --, the ext is ', path.extname(file.originalname));
        } else {


            debug.console('found error from uploadToMemory -- -- --, the ext is ', path.extname(file.originalname));
            res.json({
                status: 0,
                message: " Only provide pdf, try again"
            })
            pass = false;
            return;

        }
        if (file.size > 1 * 1024 * 1024 * 3) {
            debug.console('found error from uploadToMemory -- -- --, the size is large than 3 mb ', file.size);
            res.json({
                status: 0,
                message: " Only provide less than 3 Mb"
            })
            pass = false;
            return;
        }
        if (pass) {
            next();
        }
    } else {
        debug.console('no provided file');
        next();
    }
};

module.exports.uploadFileToMongo = async (mongo, file, type) => {
    debug.console('from uploadFileToMongo for type  : ', type);
    if (mongo instanceof alib) {

        let collection = '';
        let document = "";
        if (type === 'userspdf') {
            collection = 'usersPdf';
            document = 'pdf';
        }
        else if (type === 'profileimg') {
            collection = 'usersImg';
            document = 'img';
        }
        else if (type === 'jobimg') {
            collection = "jobsImg";
            document = 'img';
        }
        else if (type === 'temp') {
            collection = 'tempImg';
            document = 'img'
        }
        else {
            console.error('please provide valied type to the uploadFileToMongo util');
            return false;
        }

        try {
            if (file) {
                debug.console("the file found  : ", file)

                let finalFileName = file.fieldname + new Date().toLocaleString();
                let mongo = new alib('Work', process.env.MONGOSTRING);
                mongo.setCollection(collection);
                let result = await mongo.insertOne({
                    document: document,
                    fileName: finalFileName,
                    mimetype: file.mimetype,
                    buffer: file.buffer.toString("base64")
                });

                await mongo.over();
                debug.console('the result we found is : ', result);
                if (result.acknowledged) {
                    debug.console('Succesfully inserted the file : ', file.fieldname);
                    return {
                        status: true,
                        fileName: finalFileName
                    };
                } else {
                    debug.console('unable to insert the file : ', file.fieldname);
                    return false;
                }

            } else {
                debug.console('please provide file to uploadFileToMongo util');
                return false;
            }
        } catch (error) {
            console.error('Error From uploadFileToMongo : ', error);
        }
    } else {
        console.error('please provide the instance of alib, as first parameter to uploadFileToMongo');
        return false;
    }

};

module.exports.fetchFileFromMongo = async (mongo, fileName, type) => {
    debug.console('from uploadFileToMongo for type  : ', type);
    if (mongo instanceof alib) {

        let collection = '';
        if (type === 'userspdf') {
            collection = 'usersPdf';

        }
        else if (type === 'profileimg') {
            collection = 'usersImg';

        }
        else if (type === 'jobimg') {
            collection = "jobsImg";

        }
        else if (type === 'temp') {
            collection = 'tempImg';

        }
        else {
            console.error('please provide valied type to the uploadFileToMongo util');
            return false;
        }

        try {
            if (fileName) {
                debug.console("the fileName found  : ", fileName)

                let mongo = new alib('Work', process.env.MONGOSTRING);
                mongo.setCollection(collection);
                let result = await mongo.find({
                    fileName: fileName,
                });

                await mongo.over();
                debug.console('the result we found is : ', result);
                if (result.length > 0) {
                    debug.console('Succesfully have the file: ', result[0].fileName);
                    return {
                        status: true,
                        file: result[0]
                    };
                } else {
                    debug.console('unable to have the file : ', fieldname);
                    return false;
                }

            } else {
                debug.console('please provide fileName to fetchFileFromMongo util');
                return false;
            }
        } catch (error) {
            console.error('Error From fetchFileFromMongo : ', error);
        }

    } else {
        console.error('please provide the instance of alib, as first parameter to fetchFileFromMongo');
        return false;
    }
}